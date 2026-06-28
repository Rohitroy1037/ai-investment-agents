import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import YahooFinance from "yahoo-finance2";
import NodeCache from "node-cache";

const yahooFinance = new YahooFinance();
const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

/**
 * Helper: Formats the raw Yahoo Finance data into a cleaner string/JSON for the LLM context.
 */
const getFinancialData = async (companyName) => {
  // Check cache first
  const cacheKey = `finance_${companyName.toLowerCase()}`;
  if (cache.has(cacheKey)) {
    console.log(`⚡ [Cache Hit] Finance Tool: ${companyName}`);
    return cache.get(cacheKey);
  }

  try {
    console.log(`💰 [API Call] Searching Yahoo Finance for "${companyName}"...`);
    const searchResults = await yahooFinance.search(companyName);

    if (!searchResults.quotes || searchResults.quotes.length === 0) {
      const errorMsg = `No financial data found for ${companyName}.`;
      cache.set(cacheKey, errorMsg);
      return errorMsg;
    }

    const ticker =
      searchResults.quotes.find((q) => q.quoteType === "EQUITY")?.symbol ||
      searchResults.quotes[0].symbol;

    const [quoteData, summaryData] = await Promise.all([
      yahooFinance.quote(ticker).catch(() => null),
      yahooFinance
        .quoteSummary(ticker, {
          modules: [
            "summaryProfile",
            "financialData",
            "defaultKeyStatistics",
          ],
        })
        .catch(() => null),
    ]);

    const profile = summaryData?.summaryProfile || {};
    const financials = summaryData?.financialData || {};
    // Find CEO (usually the first officer)
    const ceo = profile?.companyOfficers?.find(o => o.title?.toLowerCase().includes("ceo"))?.name || "N/A";
    
    // We stringify this compactly so the LLM doesn't waste tokens
    // We also include all fields the frontend UI expects so we can pass them through directly
    const result = JSON.stringify({
      companyName: quoteData?.longName || companyName,
      ticker: ticker,
      industry: profile?.industry || "N/A",
      sector: profile?.sector || "N/A",
      ceo: ceo,
      founded: "N/A", // Yahoo Finance doesn't reliably provide founded date
      employees: profile?.fullTimeEmployees || "N/A",
      marketCap: quoteData?.marketCap || "N/A",
      currentStockPrice: quoteData?.regularMarketPrice || "N/A",
      revenueGrowth: financials?.revenueGrowth || "N/A",
      profitMargin: financials?.profitMargins || "N/A",
      operatingMargin: financials?.operatingMargins || "N/A",
      peRatio: quoteData?.trailingPE || "N/A",
      eps: quoteData?.epsTrailingTwelveMonths || "N/A",
      debtToEquity: financials?.debtToEquity || "N/A",
      weekHigh52: quoteData?.fiftyTwoWeekHigh || "N/A",
      weekLow52: quoteData?.fiftyTwoWeekLow || "N/A",
      dividendYield: quoteData?.dividendYield || "N/A",
      businessSummary: profile?.longBusinessSummary || "N/A",
    });

    // Save to cache
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`❌ Finance Tool Error: ${error.message}`);
    return `Failed to fetch financial data: ${error.message}`;
  }
};

/**
 * LangChain Tool: Finance Tool
 */
export const financeTool = new DynamicStructuredTool({
  name: "financeTool",
  description:
    "Fetches comprehensive financial metrics (market cap, revenue, margins, P/E, EPS, business summary) for a given company.",
  schema: z.object({
    company: z
      .string()
      .describe("The name of the company or ticker symbol (e.g., 'Tesla' or 'TSLA')"),
  }),
  func: async ({ company }) => {
    return await getFinancialData(company);
  },
});
