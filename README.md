# AI Investment Research Agent

A full-stack, production-ready AI investment analyst powered by LangChain.js, Grok (xAI), Express.js, and React.

This application accepts a company name, parallel-fetches real-time financial metrics from Yahoo Finance and recent articles from NewsAPI, builds a comprehensive context, and uses a LangChain orchestration layer to instruct Grok to perform a deep-dive analysis, returning a structured JSON response rendered in a highly polished React Dashboard.

## Features

- **LangChain AI Orchestration**: Modular, sequential tool execution using Zod schemas and `@langchain/openai` configured for xAI.
- **Production Backend**: Helmet security headers, GZIP compression, Morgan structured logging, and strict rate-limiting.
- **Resilient Tooling**: 5-minute memory caching (`node-cache`) to preserve API quotas and `axios-retry` for robust external fetching.
- **Polished Dashboard**: Dark/Light mode, animated skeleton loaders, empty states, and toast notifications.
- **Data Visualization**: Integrated `recharts` for financial bar charts and an animated investment score gauge.
- **Action Buttons**: Export the entire analysis as a PDF, print, copy to clipboard, or share natively.
- **Search History**: Persistent local-storage search history for rapid re-analysis.
- **Full Test Coverage**: Jest and Supertest integration for API reliability testing.

---

## Architecture

```text
React Frontend
        │
        ▼
Express Backend
        │
        ▼
LangChain Investment Agent
   ┌───────────────┐
   │               │
   ▼               ▼
Finance Tool   News Tool
   │               │
   └───────┬───────┘
           ▼
     Combined Context
           ▼
      Grok API (xAI)
           ▼
 Investment Recommendation
           ▼
 React Dashboard
```

## Project Structure

```text
ai-investment-agent/
│
├── frontend/                 # React + Vite frontend
│   ├── src/                  # Components, pages, services
│   ├── public/               # Static assets
│   ├── package.json          # Frontend dependencies
│   └── vercel.json           # Vercel deployment config
│
├── backend/                  # Node.js + Express backend
│   ├── controllers/          # API route handlers
│   ├── services/             # LangChain agents & tools
│   ├── package.json          # Backend dependencies
│   └── render.yaml           # Render deployment blueprint
│
├── README.md                 # Project documentation
└── .gitignore
```

---

## Installation & Setup

### Prerequisites
- Node.js v18+
- [xAI API Key](https://console.x.ai/) (Requires active billing credits)
- [NewsAPI Key](https://newsapi.org/) (Optional, falls back if omitted)

### 1. Clone & Install
```bash
# Install frontend
cd frontend
npm install
cd ..

# Install backend
cd backend
npm install
cd ..
```

### 2. Configure Environment
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
GROQ_API_KEY=your_xai_api_key_here
GROQ_BASE_URL=https://api.x.ai/v1
NEWS_API_KEY=your_newsapi_key_here
```

### 3. Run Locally
Start both servers simultaneously in separate terminals:
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```
Navigate to `http://localhost:5173`.

---

## Deployment

This repository is pre-configured for modern serverless and PaaS deployment.

### Frontend (Vercel)
1. Import the repository to Vercel.
2. Vercel will automatically detect Vite and use `vercel.json` for SPA routing.

### Backend (Render)
1. Connect the repository to Render.
2. The included `render.yaml` Blueprint will automatically provision the Node web service.
3. Ensure you add `GROQ_API_KEY` and `NEWS_API_KEY` to the Render environment variables dashboard.

---

## API Documentation

### `POST /api/invest`
Analyzes a company and returns a structured AI recommendation.

**Request Body:**
```json
{
  "company": "Apple"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "company": "Apple Inc.",
    "overview": "...",
    "investmentScore": 85,
    "recommendation": "INVEST",
    "confidence": "90%",
    "reason": "Strong balance sheet...",
    "financialMetrics": { ... },
    "latestNews": [ ... ],
    "extras": { ... }
  }
}
```

---

## Known Limitations
- **xAI Billing:** If your xAI account does not have credits, the API will reject the prompt with a `400` or `403` error. The UI gracefully handles this with a Toast notification and Error Screen.
- **NewsAPI Limitations:** Free-tier NewsAPI limits requests and delays indexing. Caching mitigates this.

## Future Improvements
- **Websockets**: Stream the LangChain agent's thoughts to the UI in real-time.
- **Authentication**: Add Clerk to save portfolios.
- **Database**: Add PostgreSQL (Prisma) to persist historical analysis data permanently.
