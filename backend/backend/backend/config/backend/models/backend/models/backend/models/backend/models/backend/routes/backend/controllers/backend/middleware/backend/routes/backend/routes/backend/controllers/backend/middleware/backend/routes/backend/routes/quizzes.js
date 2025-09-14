import express from "express";
import {
  createQuiz,
  getQuizzesByCourse,
  getQuizById,
  attemptQuiz,
} from "../controllers/quizController.js";
import { protect } from "../middleware/authMiddleware.js";
import { instructorOnly, adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// @route   GET /api/quizzes/course/:courseId
// @desc    Get all quizzes for a course
router.get("/course/:courseId", protect, getQuizzesByCourse);

// @route   GET /api/quizzes/:id
// @desc    Get quiz details by ID
router.get("/:id", protect, getQuizById);

// @route   POST /api/quizzes
// @desc    Create new quiz (Instructor only)
router.post("/", protect, instructorOnly, createQuiz);

// @route   POST /api/quizzes/:id/attempt
// @desc    Attempt a quiz (Student only)
router.post("/:id/attempt", protect, attemptQuiz);

export default router;
