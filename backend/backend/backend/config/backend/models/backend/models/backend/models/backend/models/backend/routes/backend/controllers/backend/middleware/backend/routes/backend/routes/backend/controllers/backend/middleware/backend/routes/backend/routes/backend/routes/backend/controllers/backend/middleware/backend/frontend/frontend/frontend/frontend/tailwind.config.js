/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enable dark/light mode toggle via 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5", // Indigo
          light: "#6366F1",
          dark: "#4338CA",
        },
        secondary: {
          DEFAULT: "#F59E0B", // Amber
          light: "#FBBF24",
          dark: "#B45309",
        },
        accent: {
          DEFAULT: "#10B981", // Emerald
          light: "#34D399",
          dark: "#047857",
        },
        background: {
          light: "#F9FAFB",
          dark: "#1F2937",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        serif: ["Merriweather", "ui-serif", "Georgia"],
      },
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
