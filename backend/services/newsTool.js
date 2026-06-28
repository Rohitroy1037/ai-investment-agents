import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import axios from "axios";
import axiosRetry from "axios-retry";
import NodeCache from "node-cache";

// Configure Axios to retry failed requests (e.g. 500, 502, 503, 504, or network errors)
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
  }
});

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/everything";
const REQUEST_TIMEOUT = 15000; // 15 seconds

const cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache

/**
 * Helper: Fetches news articles and formats them for the LLM.
 */
const getLatestNews = async (companyName) => {
  // Check cache first
  const cacheKey = `news_${companyName.toLowerCase()}`;
  if (cache.has(cacheKey)) {
    console.log(`⚡ [Cache Hit] News Tool: ${companyName}`);
    return cache.get(cacheKey);
  }

  if (!NEWS_API_KEY) {
    console.warn("⚠️ NEWS_API_KEY is not configured.");
    return "News API key is missing. No recent news available.";
  }

  try {
    console.log(`📰 [API Call] Fetching news for "${companyName}"...`);

    const response = await axios.get(NEWS_API_URL, {
      params: {
        q: companyName,
        language: "en",
        sortBy: "publishedAt",
        pageSize: 5,
        apiKey: NEWS_API_KEY,
      },
      timeout: REQUEST_TIMEOUT,
    });

    if (
      !response.data ||
      response.data.status !== "ok" ||
      !response.data.articles ||
      response.data.articles.length === 0
    ) {
      const msg = `No recent news articles found for ${companyName}.`;
      cache.set(cacheKey, msg);
      return msg;
    }

    const articles = response.data.articles.map((article) => ({
      title: article.title || "Untitled",
      description: article.description || "No description",
      source: article.source?.name || "Unknown",
      date: article.publishedAt
        ? new Date(article.publishedAt).toISOString().split("T")[0]
        : "N/A",
      url: article.url || "#",
    }));

    const result = JSON.stringify(articles);
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`❌ News Tool Error: ${error.message}`);
    return `Failed to fetch news: ${error.message}`;
  }
};

/**
 * LangChain Tool: News Tool
 */
export const newsTool = new DynamicStructuredTool({
  name: "newsTool",
  description:
    "Fetches the latest 5 news articles related to a company. Useful to understand current events and sentiment.",
  schema: z.object({
    company: z.string().describe("The name of the company (e.g., 'Tesla')"),
  }),
  func: async ({ company }) => {
    return await getLatestNews(company);
  },
});
