import express from "express";
const router = express.Router();
import { analyzeCompany } from "../controllers/investmentController.js";

// POST /api/invest — Analyze a company and return investment recommendation
router.post("/invest", analyzeCompany);

export default router;
