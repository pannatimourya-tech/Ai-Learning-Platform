// backend/routes/courses.js
import express from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollInCourse,
} from "../controllers/courseController.js";
import { protect } from "../middleware/authMiddleware.js";
import { instructorOnly, adminOnly } from "../middleware/roleMiddleware.js";

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses
router.get("/", getCourses);

// @route   GET /api/courses/:id
// @desc    Get single course by ID
router.get("/:id", getCourseById);

// @route   POST /api/courses
// @desc    Create new course (instructor only)
router.post("/", protect, instructorOnly, createCourse);

// @route   PUT /api/courses/:id
// @desc    Update course (instructor/admin only)
router.put("/:id", protect, instructorOnly, updateCourse);

// @route   DELETE /api/courses/:id
// @desc    Delete course (admin only)
router.delete("/:id", protect, adminOnly, deleteCourse);

// @route   POST /api/courses/:id/enroll
// @desc    Enroll student in a course
router.post("/:id/enroll", protect, enrollInCourse);

export default router;
