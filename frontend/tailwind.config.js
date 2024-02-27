/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],  // no spaces in the 2nd argument
  theme: {
    extend: {},
    container:{
      padding:{
        md: "10rem",
      }
    }
  },
  plugins: [],
}

