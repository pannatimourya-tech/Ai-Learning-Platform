import Link from "next/link";
import axios from "axios";

export default function CourseCard({ course, token, onEnroll }) {
  const handleEnroll = async () => {
    if (!token) {
      alert("Please login to enroll in courses.");
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/enroll/${course._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Enrolled successfully!");
      if (onEnroll) onEnroll(course._id);
    } catch (err) {
      console.error(err);
      alert("Enrollment failed.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{course.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{course.description}</p>
      </div>

      {/* Progress Bar */}
      {course.progressPercentage !== undefined && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-primary h-3 rounded-full transition-all"
              style={{ width: `${course.progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {course.progressPercentage}% Completed
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Link href={`/courses/${course._id}`}>
          <a className="text-secondary font-semibold hover:underline">View Course</a>
        </Link>

        {!course.enrolled ? (
          <button
            onClick={handleEnroll}
            className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition"
          >
            Enroll
          </button>
        ) : (
          <span className="text-green-500 font-semibold">Enrolled</span>
        )}
      </div>
    </div>
  );
}
