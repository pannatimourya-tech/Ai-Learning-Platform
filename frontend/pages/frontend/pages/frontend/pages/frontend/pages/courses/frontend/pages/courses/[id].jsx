import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!id) return;

    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourse(res.data);
        setCurrentLesson(res.data.lessons[0] || null);
      } catch (err) {
        console.error(err);
        alert("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, token]);

  if (loading) return <p className="text-center mt-12">Loading course...</p>;
  if (!course) return <p className="text-center mt-12">Course not found.</p>;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
      {/* Course Header */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{course.title}</h1>
        <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lessons List */}
        <aside className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-h-[600px] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Lessons</h2>
          <ul className="space-y-2">
            {course.lessons.map((lesson, idx) => (
              <li
                key={idx}
                onClick={() => setCurrentLesson(lesson)}
                className={`cursor-pointer px-4 py-2 rounded-lg ${
                  currentLesson?._id === lesson._id
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {lesson.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* Lesson Player & Notes */}
        <main className="md:col-span-2 space-y-6">
          {currentLesson ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{currentLesson.title}</h3>
              
              {/* Video Player */}
              {currentLesson.videoUrl && (
                <video
                  src={currentLesson.videoUrl}
                  controls
                  className="w-full rounded-lg mb-4"
                />
              )}

              {/* Notes / PDF */}
              {currentLesson.notes && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                  <p className="text-gray-700 dark:text-gray-300">{currentLesson.notes}</p>
                </div>
              )}

              {/* AI Quiz Section */}
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Quiz</h4>
                <button
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/quizzes/generate`,
                        { courseId: course._id, lessonId: currentLesson._id },
                        { headers: { Authorization: `Bearer ${token}` } }
                      );
                      alert("Quiz generated! Check your dashboard.");
                    } catch (err) {
                      alert("Failed to generate quiz.");
                    }
                  }}
                  className="bg-secondary text-white px-4 py-2 rounded-xl hover:bg-secondary-dark transition"
                >
                  Generate AI Quiz
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Select a lesson to start learning.</p>
          )}
        </main>
      </div>
    </div>
  );
}
