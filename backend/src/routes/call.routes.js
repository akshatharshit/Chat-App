import express from "express";
import { getCallHistory } from "../controllers/call.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"; 

const router = express.Router();

// GET /api/calls/history
router.get("/history", protectRoute, getCallHistory);

export default router;
