import Link from "next/link";
import useSWR from "swr";

export default function Home() {
  const { data: courses, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/courses`);

  if (error) return <div className="text-red-500">Failed to load courses.</div>;
  if (!courses) return <div className="text-gray-500">Loading courses...</div>;

  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
          Learn AI with Interactive Courses
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
          Join Pannati Mourya’s AI Learning Platform and master AI, ML, and Deep Learning at your pace.
        </p>
        <Link href="/courses">
          <a className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary-dark transition">
            Explore Courses
          </a>
        </Link>
      </section>

      {/* Courses Grid */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Featured Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                {course.description}
              </p>
              <div className="flex justify-between items-center">
                <Link href={`/courses/${course._id}`}>
                  <a className="text-secondary font-semibold hover:underline">View Course</a>
                </Link>
                <span className="text-sm text-gray-500">{course.lessons.length} Lessons</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Start Learning Today!</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Sign up and unlock quizzes, AI tutor assistance, progress tracking, and more.
        </p>
        <Link href="/auth/signup">
          <a className="bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary-dark transition">
            Get Started
          </a>
        </Link>
      </section>
    </div>
  );
}
