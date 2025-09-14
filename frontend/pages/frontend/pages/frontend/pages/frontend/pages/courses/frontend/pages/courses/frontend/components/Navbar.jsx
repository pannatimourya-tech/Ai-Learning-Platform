import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <a className="text-2xl font-bold text-primary dark:text-secondary">AI Learning</a>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <a className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">Home</a>
            </Link>
            <Link href="/courses">
              <a className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">Courses</a>
            </Link>
            <Link href="/tutor">
              <a className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">AI Tutor</a>
            </Link>
            {isLoggedIn && (
              <Link href="/dashboard">
                <a className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">Dashboard</a>
              </Link>
            )}

            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <a className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition">
                    Login
                  </a>
                </Link>
                <Link href="/signup">
                  <a className="bg-secondary text-white px-4 py-2 rounded-xl hover:bg-secondary-dark transition">
                    Sign Up
                  </a>
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-900 dark:text-gray-100 focus:outline-none"
            >
              {menuOpen ? "✖️" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pt-4 pb-2 space-y-2">
          <Link href="/">
            <a className="block text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">Home</a>
          </Link>
          <Link href="/courses">
            <a className="block text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">Courses</a>
          </Link>
          <Link href="/tutor">
            <a className="block text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">AI Tutor</a>
          </Link>
          {isLoggedIn && (
            <Link href="/dashboard">
              <a className="block text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-secondary">Dashboard</a>
            </Link>
          )}

          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <a className="block bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition">Login</a>
              </Link>
              <Link href="/signup">
                <a className="block bg-secondary text-white px-4 py-2 rounded-xl hover:bg-secondary-dark transition">Sign Up</a>
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="mt-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition w-full"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
}
