import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { financeTool } from "./financeTool.js";
import { newsTool } from "./newsTool.js";

// ── Define Output Schema using Zod ──
const outputSchema = z.object({
  company: z.string(),
  ceo: z.string().describe("The name of the current CEO"),
  founded: z.string().describe("The year the company was founded"),
  overview: z.string(),
  industry: z.string(),
  businessSummary: z.string(),
  competitiveAdvantage: z.string(),
  financialHealth: z.string(),
  revenueAnalysis: z.string(),
  profitability: z.string(),
  valuation: z.string(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  opportunities: z.array(z.string()),
  threats: z.array(z.string()),
  risks: z.array(z.string()),
  investmentScore: z.number(),
  recommendation: z.enum(["INVEST", "PASS"]),
  confidence: z.string(),
  reason: z.string(),
});

const parser = StructuredOutputParser.fromZodSchema(outputSchema);

/**
 * Service: investmentAgent
 * Orchestrates the LangChain flow: calls tools in parallel, builds context,
 * and invokes the Groq API to get a structured recommendation.
 *
 * @param {string} companyName — The company to analyze
 * @returns {object} — Structured investment analysis
 */
export const invokeInvestmentAgent = async (companyName) => {
  // ── 1. Check Configuration ──
  const apiKey = process.env.GROQ_API_KEY; 
  if (!apiKey) {
    throw new Error("API key is not configured. Please set it in your .env file.");
  }

  const modelName = process.env.GROQ_MODEL || "llama-3.1-8b-instant";

  // Initialize the LangChain Chat Model for Groq
  const model = new ChatGroq({
    apiKey: apiKey,
    temperature: 0.2, 
    model: modelName,
    maxRetries: 2,
    modelKwargs: {
      response_format: { type: "json_object" }
    }
  });

  const startTime = Date.now();
  console.log(`\n🤖 [Agent] Starting analysis for: ${companyName}`);

  try {
    // ── 2. Execute Tools in Parallel ──
    console.log(`⚙️ [Agent] Executing tools in parallel (Finance & News)...`);
    const toolStartTime = Date.now();
    
    // Using LangChain's Tool abstraction .invoke() method
    const [financeData, newsData] = await Promise.all([
      financeTool.invoke({ company: companyName }),
      newsTool.invoke({ company: companyName }),
    ]);
    
    console.log(`✅ [Agent] Tools finished in ${Date.now() - toolStartTime}ms`);

    // ── 3. Combine Context and Build Prompt ──
    const formatInstructions = parser.getFormatInstructions();

    const promptTemplate = new PromptTemplate({
      template: `System: You are an expert equity research analyst. Your task is to decide whether someone should INVEST or PASS after analyzing company fundamentals and recent news.
Always think step-by-step before giving your answer. Never invent financial information.
CRITICAL INSTRUCTION: Return ONLY a single, valid JSON object containing your analysis. DO NOT output the JSON schema. DO NOT include any conversational text.

{format_instructions}

User:
Company: {company}

Perform:
1. Company Overview
2. CEO Name (Find the current CEO)
3. Founded Year
4. Business Summary
5. Industry Analysis
6. Competitive Advantage
7. Financial Health
8. Revenue Analysis
9. Profitability
10. Valuation
11. SWOT Analysis
12. Major Risks
13. Growth Opportunities
14. Investment Score (0-100)
15. Recommendation (Only choose INVEST or PASS)
16. Confidence
17. Simple reasoning

Use the following context gathered by our tools:

Financial Data:
{finance_data}

Recent News:
{news_data}`,
      inputVariables: ["company", "finance_data", "news_data"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const prompt = await promptTemplate.format({
      company: companyName,
      finance_data: financeData,
      news_data: newsData,
    });

    // ── 4. Call Grok API ──
    console.log(`🧠 [Agent] Sending combined context to Grok API...`);
    const llmStartTime = Date.now();
    
    const response = await model.invoke(prompt);
    
    console.log(`✅ [Agent] Grok responded in ${Date.now() - llmStartTime}ms`);

    // ── 5. Parse and Return JSON ──
    let rawText = response.content.trim();
    
    // Fallback: If LLaMA returns the schema AND the data, extract the data block
    if (rawText.includes('"company":') && rawText.includes('"$schema":')) {
      const dataStartIndex = rawText.lastIndexOf('{', rawText.indexOf('"company":'));
      const dataEndIndex = rawText.lastIndexOf('}');
      if (dataStartIndex !== -1 && dataEndIndex !== -1) {
        rawText = rawText.substring(dataStartIndex, dataEndIndex + 1);
      }
    }
    
    // Clean any markdown wrapper
    rawText = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();

    const rawJson = JSON.parse(rawText);
    const parsedJson = outputSchema.parse(rawJson);
    
    // Convert the stringified tool data back to JSON objects so we can attach them
    let parsedFinanceData = {};
    let parsedNewsData = [];
    try {
      parsedFinanceData = JSON.parse(financeData);
      console.log(`📊 [Agent] Parsed Finance Data keys: ${Object.keys(parsedFinanceData).join(', ')}`);
    } catch (e) {
      console.warn("Could not parse financeData string:", financeData?.substring?.(0, 200));
    }
    try {
      parsedNewsData = JSON.parse(newsData);
    } catch (e) {
      console.warn("Could not parse newsData string:", newsData?.substring?.(0, 200));
    }

    const finalResponse = {
      ...parsedJson,
      financialMetrics: parsedFinanceData,
      latestNews: parsedNewsData
    };

    console.log(`🏁 [Agent] Total execution time: ${Date.now() - startTime}ms`);
    return finalResponse;

  } catch (error) {
    console.error(`❌ [Agent] Error during execution: ${error.message}`);
    
    // Throw an error that the controller can handle
    const agentError = new Error(`AI Agent failed: ${error.message}`);
    agentError.statusCode = error.status || 500;
    throw agentError;
  }
};
