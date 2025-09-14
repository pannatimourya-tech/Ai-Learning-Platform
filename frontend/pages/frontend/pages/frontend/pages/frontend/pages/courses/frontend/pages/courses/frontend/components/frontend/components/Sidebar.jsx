import Link from "next/link";
import { useState, useEffect } from "react";

export default function Sidebar({ darkMode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  }, []);

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 h-screen shadow-md flex-shrink-0 hidden md:flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-secondary">AI Learning</h2>

      <nav className="flex flex-col space-y-2">
        <Link href="/dashboard">
          <a className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            Dashboard
          </a>
        </Link>
        <Link href="/courses">
          <a className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            Courses
          </a>
        </Link>
        <Link href="/tutor">
          <a className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            AI Tutor
          </a>
        </Link>
        <Link href="/quizzes">
          <a className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            Quizzes
          </a>
        </Link>
        <Link href="/profile">
          <a className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition">
            Profile
          </a>
        </Link>
      </nav>

      {isLoggedIn && (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </aside>
  );
}
