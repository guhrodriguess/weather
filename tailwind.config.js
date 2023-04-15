/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "#6d67d0",
        bgSecondary: "#615add",
        textPrimary: "#87ebcd",
        textSecondary: "#dad8f7",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
