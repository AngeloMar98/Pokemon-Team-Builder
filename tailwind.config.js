/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js,ts}"],
  theme: {
    extend: {
      fontFamily: {},
      boxShadow: {},
      colors: {},
    },
    screens: {
      tablet: "800px",
      laptop: "960px",
      desktop: "1280px",
    },
  },
};
