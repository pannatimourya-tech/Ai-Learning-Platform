import axios from "axios";

// Base API instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token dynamically if available
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

/* -------------------- AUTH APIs -------------------- */
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
export const getMe = () => api.get("/auth/me");

/* -------------------- COURSES APIs -------------------- */
export const getAllCourses = () => api.get("/courses");
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const enrollCourse = (id) => api.post(`/courses/enroll/${id}`);

/* -------------------- QUIZZES APIs -------------------- */
export const getQuizById = (id) => api.get(`/quizzes/${id}`);
export const generateQuiz = (courseId, lessonId) =>
  api.post("/quizzes/generate", { courseId, lessonId });
export const submitQuiz = (quizId, answers) =>
  api.post(`/quizzes/submit/${quizId}`, { answers });

/* -------------------- AI TUTOR APIs -------------------- */
export const askTutor = (question) => api.post("/tutor", { question });

/* -------------------- USER PROGRESS -------------------- */
export const getProgress = (userId) => api.get(`/progress/${userId}`);

/* -------------------- EXPORT DEFAULT API -------------------- */
export default api;
