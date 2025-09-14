// backend/models/Progress.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    completedLessons: [
      {
        lessonId: { type: mongoose.Schema.Types.ObjectId },
        completedAt: { type: Date, default: Date.now },
      },
    ],
    quizScores: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        score: { type: Number, default: 0 },
        attemptedAt: { type: Date, default: Date.now },
      },
    ],
    overallScore: { type: Number, default: 0 }, // Aggregated performance
    certificateIssued: { type: Boolean, default: false },
    lastAccessed: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;
