# AI Investment Research Agent — Backend

Node.js + Express backend powered by **Grok (xAI)** for AI-driven investment analysis, enriched with real-time financial data from Yahoo Finance and recent news from NewsAPI.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Provider:** Grok (xAI) — `grok-4` model
- **Data Providers:** 
  - `yahoo-finance2` (Financial Data)
  - NewsAPI (Latest News)
- **HTTP Client:** Axios
- **Dev Tool:** Nodemon

## Architecture Flow

```text
User
   │
   ▼
React Frontend
   │
   ▼
Express Backend
   │
   ├────────► Yahoo Finance
   │
   ├────────► News API
   │
   ▼
Merge Data
   │
   ▼
Grok API
   │
   ▼
Structured Investment Analysis
   │
   ▼
Frontend Dashboard
```

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Copy the example file and add your API keys:

```bash
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
GROK_API_KEY=your_actual_grok_api_key_here
GROK_BASE_URL=https://api.x.ai/v1
NEWS_API_KEY=your_news_api_key_here
```

> **API Keys:**
> - Get your Grok API key at [console.x.ai](https://console.x.ai/)
> - Get your NewsAPI key at [newsapi.org](https://newsapi.org/)

### 3. Start the server

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

The server will start at `http://localhost:5000`.

## API Reference

### `POST /api/invest`

Analyze a company and get an investment recommendation based on current financials and news.

**Request:**

```json
{
  "company": "Tesla"
}
```

**Sample Success Response (200):**

```json
{
  "success": true,
  "data": {
    "company": "Tesla",
    "overview": "Tesla, Inc. designs, develops, manufactures, and sells electric vehicles...",
    "businessModel": "Vertically integrated automotive and energy company...",
    "industry": "Electric Vehicles & Clean Energy",
    "financialHealth": "Strong liquidity but high valuation multiples...",
    "growthPotential": "Significant upside from Robotaxi and Energy Storage...",
    "competitiveAdvantage": "Proprietary software, charging network, brand loyalty...",
    "strengths": ["Market leader", "Vertical integration"],
    "weaknesses": ["Key man risk (Elon Musk)", "High valuation"],
    "opportunities": ["FSD commercialization", "Energy storage expansion"],
    "threats": ["Chinese EV competition", "Regulatory scrutiny"],
    "riskFactors": ["Macroeconomic sensitivity", "Battery material costs"],
    "investmentScore": 87,
    "confidence": "85%",
    "recommendation": "INVEST",
    "reason": "Tesla maintains a dominant position in the EV market...",
    "longTermOutlook": "Bullish long-term driven by AI and robotics...",
    "financialMetrics": {
      "marketCap": "$785.6B",
      "stockPrice": "$248.42",
      "peRatio": "62.3",
      "eps": "$3.91",
      "revenueGrowth": "+12.40%",
      "profitMargin": "15.5%"
    },
    "latestNews": [
      {
        "title": "Tesla Cybertruck Production Ramps Up",
        "source": "Reuters",
        "date": "2026-06-26",
        "url": "https://example.com/news1"
      }
    ]
  }
}
```

**Error Response (400):**

```json
{
  "success": false,
  "message": "Company name is required"
}
```

## Project Structure

```
backend/
├── controllers/
│   └── investmentController.js   # Parallel data fetching & response handling
├── routes/
│   └── investmentRoutes.js       # POST /api/invest route
├── services/
│   ├── grokService.js            # Grok (xAI) API integration
│   ├── financeService.js         # Yahoo Finance integration
│   └── newsService.js            # NewsAPI integration
├── middleware/                    # (Ready for auth, rate limiting)
├── utils/                        # (Ready for helpers, formatters)
├── .env                          # Environment variables (not committed)
├── .env.example                  # Template for .env
├── server.js                     # Express app entry point
└── package.json
```
