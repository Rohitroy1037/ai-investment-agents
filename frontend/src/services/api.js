import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000, // 2 minutes — AI analysis can take time
});

/**
 * Send a company name to the backend for investment research.
 * POST /api/invest
 * @param {string} companyName - The name of the company to research
 * @returns {Promise} - The research results
 */
export const getInvestmentResearch = async (companyName) => {
  const response = await apiClient.post("/api/invest", {
    company: companyName,
  });
  return response.data;
};

/**
 * Transform the backend API response into the format expected by frontend components.
 * This adapter keeps backend and frontend decoupled.
 *
 * @param {object} apiData — The `data` field from the backend response
 * @returns {object} — Formatted data for frontend components
 */
export const transformApiResponse = (apiData) => {
  const fm = apiData.financialMetrics || {};

  // Helper: format large numbers (e.g. 4084000000000 → "$4.08T")
  const formatMarketCap = (value) => {
    if (!value || value === "N/A") return "N/A";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  // Helper: format percentages (e.g. 0.218 → "21.8%")
  const formatPercent = (value) => {
    if (!value || value === "N/A") return "N/A";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return `${(num * 100).toFixed(1)}%`;
  };

  // Helper: format currency values (e.g. 196.89 → "$196.89")
  const formatPrice = (value) => {
    if (!value || value === "N/A") return "N/A";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return `$${num.toFixed(2)}`;
  };

  // Helper: format plain numbers (e.g. 150000 → "150,000")
  const formatNumber = (value) => {
    if (!value || value === "N/A") return "N/A";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num.toLocaleString();
  };

  // Helper: format ratio numbers (e.g. 25.51 → "25.51")
  const formatRatio = (value) => {
    if (!value || value === "N/A") return "N/A";
    const num = Number(value);
    if (isNaN(num)) return String(value);
    return num.toFixed(2);
  };

  return {
    companyOverview: {
      companyName: fm.companyName || apiData.company || "N/A",
      ticker: fm.ticker || "",
      industry: fm.industry || apiData.industry || "N/A",
      ceo: (fm.ceo !== "N/A" ? fm.ceo : apiData.ceo) || "N/A",
      founded: (fm.founded !== "N/A" ? fm.founded : apiData.founded) || "N/A",
      employees: formatNumber(fm.employees),
      marketCap: formatMarketCap(fm.marketCap),
      currentStockPrice: formatPrice(fm.currentStockPrice),
      description: fm.businessSummary || apiData.overview || "N/A",
    },

    financialMetrics: {
      revenueGrowth: formatPercent(fm.revenueGrowth),
      netProfitMargin: formatPercent(fm.profitMargin),
      peRatio: formatRatio(fm.peRatio),
      debtToEquity: formatRatio(fm.debtToEquity),
      eps: formatPrice(fm.eps),
      weekHigh52: formatPrice(fm.weekHigh52),
      weekLow52: formatPrice(fm.weekLow52),
    },

    latestNews: (apiData.latestNews || []).map((item) => ({
      title: item.title || "Untitled",
      source: item.source || "Unknown",
      date: item.date || "N/A",
      url: item.url || "#",
    })),

    swotAnalysis: {
      strengths: apiData.strengths || [],
      weaknesses: apiData.weaknesses || [],
      opportunities: apiData.opportunities || [],
      threats: apiData.threats || [],
    },

    investmentScore: {
      score: apiData.investmentScore || 0,
      maxScore: 100,
    },

    recommendation: {
      verdict: apiData.recommendation || "N/A",
      reason: apiData.reason || "N/A",
      confidence: apiData.confidence || "N/A",
    },

    // Extra data from the AI that we can display
    extras: {
      businessModel: apiData.businessSummary || null,
      financialHealth: apiData.financialHealth || null,
      growthPotential: apiData.revenueAnalysis || null,
      competitiveAdvantage: apiData.competitiveAdvantage || null,
      riskFactors: apiData.risks || [],
      longTermOutlook: apiData.valuation || null,
    },
  };
};

export default apiClient;
