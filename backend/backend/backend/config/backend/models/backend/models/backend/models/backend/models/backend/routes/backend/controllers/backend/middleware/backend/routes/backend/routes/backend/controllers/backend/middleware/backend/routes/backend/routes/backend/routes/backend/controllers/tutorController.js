import axios from "axios";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import User from "../models/User.js";

// @desc    Ask AI tutor
export const askTutor = async (req, res) => {
  try {
    const { question, courseId } = req.body;
    if (!question) return res.status(400).json({ message: "Question is required" });

    // Optional: Fetch course context
    let contextText = "";
    if (courseId) {
      const course = await Course.findById(courseId);
      if (course) {
        contextText =
          course.description +
          " " +
          course.lessons.map(l => l.title + " " + (l.description || "")).join(" ");
      }
    }

    const payload = {
      inputs: {
        question: question,
        context: contextText,
      },
    };

    const response = await axios.post(
      `${process.env.HUGGINGFACE_API_URL}/deepset/roberta-base-squad2`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const answer = response.data?.answer || "Sorry, I could not find an answer.";

    // Optional: Save chat history in user document
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        chatHistory: { question, answer, courseId: courseId || null, askedAt: new Date() },
      },
    });

    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI Tutor error", error: error.message });
  }
};
