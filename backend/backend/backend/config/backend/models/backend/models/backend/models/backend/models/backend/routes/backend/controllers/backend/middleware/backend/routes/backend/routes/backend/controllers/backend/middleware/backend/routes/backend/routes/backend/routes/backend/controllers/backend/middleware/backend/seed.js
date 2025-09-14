import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Course from "./models/Course.js";
import Quiz from "./models/Quiz.js";

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Course.deleteMany();
    await Quiz.deleteMany();

    // Create default instructor
    const instructorPassword = await bcrypt.hash("instructor123", 10);
    const instructor = await User.create({
      name: "Default Instructor",
      email: "instructor@example.com",
      passwordHash: instructorPassword,
      role: "instructor",
      profile: { degree: "M.Tech", institution: "AI University" },
    });

    // Create default student: Pannati Mourya
    const studentPassword = await bcrypt.hash("9032325414", 10);
    const student = await User.create({
      name: "Pannati Mourya",
      email: "pannatimourya@gmail.com",
      passwordHash: studentPassword,
      role: "student",
      profile: { degree: "B.Tech", institution: "Parul University" },
    });

    // Create a sample course
    const course = await Course.create({
      title: "Introduction to AI",
      description: "Learn the basics of AI, machine learning, and neural networks.",
      instructor: instructor._id,
      lessons: [
        { title: "AI Overview", description: "Introduction to AI and its applications.", order: 1 },
        { title: "Machine Learning", description: "Basics of ML algorithms.", order: 2 },
        { title: "Neural Networks", description: "Understanding deep learning basics.", order: 3 },
      ],
      tags: ["AI", "ML", "Deep Learning"],
    });

    // Create a sample quiz
    const quiz = await Quiz.create({
      courseId: course._id,
      title: "AI Basics Quiz",
      questions: [
        {
          questionText: "What does AI stand for?",
          options: ["Artificial Intelligence", "Automated Input", "Advanced Integration", "Applied Informatics"],
          correctAnswer: "Artificial Intelligence",
          type: "mcq",
          explanation: "AI stands for Artificial Intelligence.",
        },
        {
          questionText: "Name one type of machine learning.",
          options: ["Supervised", "Unsupervised", "Reinforcement", "All of the above"],
          correctAnswer: "All of the above",
          type: "mcq",
          explanation: "Supervised, Unsupervised, and Reinforcement are types of ML.",
        },
      ],
      generatedByAI: false,
    });

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
    process.exit(1);
  }
};

seedData();
