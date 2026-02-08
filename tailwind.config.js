/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // The ** glob looks into all subfolders like /pages and /components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}