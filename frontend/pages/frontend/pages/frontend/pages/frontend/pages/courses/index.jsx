import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Link from "next/link";

export default function Courses() {
  const [search, setSearch] = useState("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data: courses, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/courses`, fetcher);

  if (error) return <p className="text-red-500 text-center mt-12">Failed to load courses.</p>;
  if (!courses) return <p className="text-gray-500 text-center mt-12">Loading courses...</p>;

  // Filter courses by search query
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        All Courses
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{course.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <Link href={`/courses/${course._id}`}>
                  <a className="text-secondary font-semibold hover:underline">View Course</a>
                </Link>
                {token ? (
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition"
                    onClick={async () => {
                      try {
                        await axios.post(
                          `${process.env.NEXT_PUBLIC_API_URL}/courses/enroll/${course._id}`,
                          {},
                          { headers: { Authorization: `Bearer ${token}` } }
                        );
                        alert("Enrolled successfully!");
                      } catch (err) {
                        alert("Enrollment failed.");
                      }
                    }}
                  >
                    Enroll
                  </button>
                ) : (
                  <Link href="/login">
                    <a className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition">
                      Login to Enroll
                    </a>
                  </Link>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
            No courses found.
          </p>
        )}
      </div>
    </div>
  );
}
