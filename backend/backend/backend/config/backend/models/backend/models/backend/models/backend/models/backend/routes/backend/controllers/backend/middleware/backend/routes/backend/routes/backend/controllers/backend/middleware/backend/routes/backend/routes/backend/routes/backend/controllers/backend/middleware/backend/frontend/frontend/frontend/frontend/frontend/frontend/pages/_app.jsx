import "../styles/globals.css";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  // Axios fetcher for SWR
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  return (
    <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>
      <div className={`min-h-screen bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="px-4 md:px-8 py-6">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
