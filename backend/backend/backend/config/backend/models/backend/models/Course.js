// backend/models/Course.js
import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    videoUrl: { type: String }, // Video hosting link (YouTube/S3/Cloudinary)
    pdfUrl: { type: String },   // Supporting document link
    order: { type: Number, default: 0 }, // Lesson order in course
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessons: [lessonSchema],
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    certificateEnabled: { type: Boolean, default: true },
    tags: [{ type: String }], // For search/filter
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
