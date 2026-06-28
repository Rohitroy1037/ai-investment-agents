const sampleData = {
  companyOverview: {
    companyName: "Tesla, Inc.",
    ticker: "TSLA",
    industry: "Electric Vehicles & Clean Energy",
    ceo: "Elon Musk",
    founded: "2003",
    employees: "140,473",
    marketCap: "$785.6B",
    currentStockPrice: "$248.42",
    description:
      "Tesla, Inc. designs, develops, manufactures, and sells electric vehicles, energy storage systems, and solar energy generation systems. The company operates through two segments: Automotive, and Energy Generation and Storage. Tesla is headquartered in Austin, Texas and has manufacturing facilities across the US, China, and Germany.",
  },

  financialMetrics: {
    revenueGrowth: "+12.4%",
    netProfitMargin: "15.5%",
    peRatio: "62.3",
    debtToEquity: "0.08",
    eps: "$3.91",
    weekHigh52: "$278.98",
    weekLow52: "$138.80",
  },

  latestNews: [
    {
      title: "Tesla Cybertruck Production Ramps Up, Exceeding Analyst Expectations",
      source: "Reuters",
      date: "2026-06-26",
    },
    {
      title: "Tesla Energy Division Revenue Surges 67% Year-Over-Year",
      source: "Bloomberg",
      date: "2026-06-25",
    },
    {
      title: "Tesla Expands Supercharger Network to 75,000 Stations Globally",
      source: "CNBC",
      date: "2026-06-23",
    },
    {
      title: "Elon Musk Announces Next-Gen Battery Technology at Annual Shareholder Meeting",
      source: "The Verge",
      date: "2026-06-20",
    },
    {
      title: "Tesla Stock Rises 4% After Strong Q2 Delivery Numbers Leak",
      source: "MarketWatch",
      date: "2026-06-18",
    },
  ],

  swotAnalysis: {
    strengths: [
      "Market leader in electric vehicles with strong brand recognition",
      "Vertically integrated manufacturing and supply chain",
      "Proprietary Supercharger network — now an industry standard",
      "Strong software and autonomous driving capabilities",
    ],
    weaknesses: [
      "High valuation relative to earnings — priced for perfection",
      "Heavy dependence on CEO Elon Musk's public persona",
      "Quality control issues and frequent recalls",
      "Limited model lineup compared to legacy automakers",
    ],
    opportunities: [
      "Robotaxi and autonomous ride-hailing platform launch",
      "Energy storage (Megapack) and solar market expansion",
      "Entry into new markets — India, Southeast Asia",
      "AI and Optimus humanoid robot commercialization",
    ],
    threats: [
      "Intensifying competition from BYD, Rivian, and legacy OEMs",
      "Regulatory risks and changing EV subsidy landscapes",
      "Geopolitical risks in China manufacturing operations",
      "Rising raw material costs for lithium-ion batteries",
    ],
  },

  investmentScore: {
    score: 87,
    maxScore: 100,
  },

  recommendation: {
    verdict: "INVEST",
    reason:
      "Tesla maintains a dominant position in the EV market with strong revenue growth, expanding energy business, and promising autonomous driving pipeline. Despite its premium valuation, the company's vertically integrated business model, growing Supercharger licensing revenue, and upcoming Robotaxi launch provide significant upside catalysts. The energy storage division is an underappreciated growth driver that could rival the automotive segment in profitability.",
    confidence: "High (87%)",
  },
};

export default sampleData;
