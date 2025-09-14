// backend/server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";

// Routes
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";

// Middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// App instance
const app = express();

// Middleware
app.use(express.json()); // Parse JSON
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Health check route
app.get("/", (req, res) => {
  res.json({ message: "AI Learning Platform API is running ✅" });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/tutor", tutorRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection + Server start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });
