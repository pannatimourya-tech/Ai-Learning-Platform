import Link from "next/link";

export default function QuizCard({ quiz, token }) {
  const attempted = quiz.score !== undefined;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition">
      <div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{quiz.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{quiz.description}</p>
      </div>

      <div className="flex justify-between items-center">
        {attempted && (
          <span className="text-green-500 font-semibold">
            Score: {quiz.score}/{quiz.totalQuestions}
          </span>
        )}

        <Link href={`/quizzes/${quiz._id}`}>
          <a
            className={`px-4 py-2 rounded-xl text-white ${
              attempted ? "bg-gray-500 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
            } transition`}
          >
            {attempted ? "Completed" : "Attempt Quiz"}
          </a>
        </Link>
      </div>
    </div>
  );
}
