import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Tutor() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const chatEndRef = useRef(null);

  // Scroll to bottom when chat updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { type: "user", text: question };
    setChat((prev) => [...prev, newMessage]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tutor`,
        { question },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiMessage = { type: "ai", text: res.data.answer };
      setChat((prev) => [...prev, aiMessage]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { type: "ai", text: "Error: Could not get a response. Please try again." },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 md:px-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
        AI Tutor
      </h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col space-y-4 max-h-[600px] overflow-y-auto">
        {chat.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            Ask me anything about your courses or AI topics!
          </p>
        )}

        {chat.map((msg, idx) => (
          <div
            key={idx}
            className={`${
              msg.type === "user" ? "self-end bg-primary text-white" : "self-start bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            } px-4 py-2 rounded-xl max-w-xs break-words`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleAsk} className="mt-4 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-gray-100"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-secondary text-white px-4 py-2 rounded-xl hover:bg-secondary-dark transition disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
    </div>
  );
}
