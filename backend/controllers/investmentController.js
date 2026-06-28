import { invokeInvestmentAgent } from "../services/investmentAgent.js";

/**
 * Controller: analyzeCompany
 * Handles POST /api/invest
 * Delegates all logic to the LangChain Investment Agent.
 */
export const analyzeCompany = async (req, res) => {
  try {
    const { company } = req.body;

    // ── Validate request ──
    if (!company || typeof company !== "string" || company.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    const companyName = company.trim();
    
    // ── Call LangChain AI Agent ──
    const analysisResult = await invokeInvestmentAgent(companyName);

    // ── Return success response ──
    // The agent already attaches parsed financialMetrics and latestNews
    return res.status(200).json({
      success: true,
      data: analysisResult,
    });
  } catch (error) {
    console.error("❌ Controller Error:", error.message);

    // Determine the appropriate status code
    const statusCode = error.statusCode || 500;
    const message = error.message || "Failed to analyze company";

    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
};
