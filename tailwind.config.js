/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        text: "var(--text)",
        cards: "var(--cards)",
        navigation: "var(--navigation)",
        borderGrey: "var(--border-grey)",
        darkGrey: "var(--dark-grey)",
        corePurple: "#A100FF",
        darkPurple: "#3D2C5A"
      }
    },
  },
  plugins: [],
}

