/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: {
        100: "#d8d8e2",
        200: "#8888a2",
        400: "#8b8bbc",
        500: "#282843",
        700: "#1e1c2a",
        900: "#1a1924",
      },
      purple: {
        100: "#dad2ec",
        500: "#633BBC",
      },
      green: {
        100: "#b3e9d9",
        500: "#00b37e",
        900: "#07847E",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
