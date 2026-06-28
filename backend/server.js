import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import investmentRoutes from "./routes/investmentRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// ========================
// Middleware
// ========================

// 1. Security Headers
app.use(helmet());

// 2. GZIP Compression for performance
app.use(compression());

// 3. Request Logging
app.use(morgan("dev"));

// 4. Rate Limiting (Prevents API abuse)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per `window`
  message: {
    success: false,
    message: "Too many requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all /api routes
app.use("/api", apiLimiter);

// 5. CORS
app.use(cors());

// 6. Body Parser
app.use(express.json());

// ========================
// Routes
// ========================

// Investment research routes
app.use("/api", investmentRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "AI Investment Research Agent API is running",
    version: "1.0.0",
  });
});

// ========================
// 404 Handler
// ========================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// ========================
// Global Error Handler
// ========================
app.use((err, req, res, next) => {
  console.error("🔥 Central Error Middleware:", err.message);
  
  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";
  
  res.status(statusCode).json({
    success: false,
    message,
    // Provide stack trace only in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ========================
// Server Initialization
// ========================
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 POST /api/invest — Analyze a company\n`);
  });
}

export default app;
