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

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Instructor/Admin routes
router.post("/", protect, instructorOnly, createCourse);
router.put("/:id", protect, instructorOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

// Student route
router.post("/:id/enroll", protect, enrollInCourse);

export default router;
