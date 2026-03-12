/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "nav-bg": "#1E3A8A",
        "primary-light": "#60A5FA",
        "primary-mid": "#3B82F6",
        "footer-light": "#E5E7EB",
        "footer-dark": "#1E3A8A"
      }
    },
  },
  plugins: [],
}