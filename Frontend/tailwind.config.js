/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary": {
          "dark": "#283618",
          "light": "#606C38"
        },
        "secondary": {
          "dark": "#BC6C25",
          "light": "#DDA15E"
        },
        "tertiary": "#FEFAE0",
      }
    },
  },
  plugins: [],
}

