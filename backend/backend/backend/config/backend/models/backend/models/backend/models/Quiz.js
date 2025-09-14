// backend/models/Quiz.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    options: [{ type: String }], // Multiple-choice options
    correctAnswer: { type: String }, // Could be option or text
    type: {
      type: String,
      enum: ["mcq", "short-answer"],
      default: "mcq",
    },
    explanation: { type: String }, // Optional explanation
  },
  { timestamps: true }
);

const attemptSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    answers: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId },
        answer: { type: String },
        isCorrect: { type: Boolean, default: false },
      },
    ],
    score: { type: Number, default: 0 },
    feedback: { type: String },
  },
  { timestamps: true }
);

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Quiz title is required"],
    },
    questions: [questionSchema],
    attempts: [attemptSchema], // Track attempts by different students
    generatedByAI: { type: Boolean, default: false }, // HuggingFace flag
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
