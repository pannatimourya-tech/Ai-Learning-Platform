import express from "express";
import { askTutor } from "../controllers/tutorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/tutor/ask
// @desc    Ask AI tutor a question
// @access  Private (Students)
router.post("/ask", protect, askTutor);

export default router;
