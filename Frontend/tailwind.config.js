/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      mobileS: "320px",
      mobileM: "375px",
      mobileL: "425px",
      tablet: "768px",
      laptop: "1024px",
      laptopL: "1440px",
      monitor: "1920px"
    },
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

