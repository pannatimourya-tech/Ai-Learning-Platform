import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // Fetch user profile from localStorage + backend
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const fetcher = (url) =>
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then((res) => res.data);

  const { data: courses, error: coursesError } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/courses/enrolled` : null,
    fetcher
  );

  useEffect(() => {
    if (token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
    }
  }, [token]);

  if (!token) return <p className="text-center mt-12">Please login to view your dashboard.</p>;
  if (!user) return <p className="text-center mt-12">Loading profile...</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      {/* Profile Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Welcome, {user.name}!
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Degree: {user.profile?.degree || "-"} | Institution: {user.profile?.institution || "-"}
        </p>
      </section>

      {/* Enrolled Courses */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Your Courses
        </h3>
        {coursesError && <p className="text-red-500">Failed to load courses.</p>}
        {!courses && <p className="text-gray-500">Loading courses...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h4 className="text-xl font-bold mb-2">{course.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{course.description}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-primary h-3 rounded-full transition-all"
                    style={{
                      width: `${course.progressPercentage || 0}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {course.progressPercentage || 0}% Completed
                </p>
              </div>

              <a
                href={`/courses/${course._id}`}
                className="text-secondary font-semibold hover:underline"
              >
                Go to Course
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Badges Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Badges</h3>
        <div className="flex flex-wrap gap-4">
          {user.badges?.length ? (
            user.badges.map((badge, idx) => (
              <div
                key={idx}
                className="bg-accent text-white px-4 py-2 rounded-lg shadow-md"
              >
                {badge.name}
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No badges earned yet.</p>
          )}
        </div>
      </section>

      {/* Leaderboard Section */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Leaderboard
        </h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <ol className="list-decimal list-inside space-y-2">
            {user.leaderboard?.length ? (
              user.leaderboard.map((entry, idx) => (
                <li key={idx} className="text-gray-700 dark:text-gray-300">
                  {entry.name} - {entry.score} pts
                </li>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No leaderboard data available.</p>
            )}
          </ol>
        </div>
      </section>
    </div>
  );
}
