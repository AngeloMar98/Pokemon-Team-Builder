/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js,ts}"],
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        default: ['"Montserrat"'],
      },
      boxShadow: {},
      colors: {
        darkM: {
          indigo: "#1e1b4b",
          whiteeeeeeeeeeeee: "#fff",
          lightIndigo1: "#312e81",
          lightIndigo2: "#6b7fc0",
          lightIndigo3: "#4f46e5",
          whiteIndigo: "#e9e8ed",
          darkBlue: "#030322",
          whiteBlue: "#e6e6e9",
          purple: "#240649",
          violet: "#6D1269",
          yellow: "#FFC300",
        },
        lightM: {
          paleOrange: "#fed7aa",
        },
        bug: "#92bc2c",
        dark: "#595761",
        dragon: "#0c69c8",
        electric: "#f2d94e",
        fairy: "#ee90e6",
        fighting: "#d3425f",
        fire: "#fba54c",
        flying: "#a1bbec",
        ghost: "#5f6dbc",
        grass: "#5fbd58",
        ground: "#da7c4d",
        ice: "#75d0c1",
        normal: "#a0a29f",
        poison: "#b763cf",
        psychic: "#fa8581",
        rock: "#c9bb8a",
        steel: "#5695a3",
        water: "#539ddf",
      },
      width: {
        pick: "60px",
      },
      height: {
        pick: "60px",
      },
      minHeight: {
        pick: "60px",
      },
    },
    screens: {
      mobile: "280px",
      tablet: "520px",
      laptop: "940px",
      desktop: "1280px",
    },
  },
  safelist: [
    "rotate-0",
    "-rotate-90",
    "rotate-180",
    "rotate-90",
    "rounded-none",
    "rounded-b-none",
    "rounded-l-md",
    "rounded-r-none",
    "rounded-unset",
    "cut-rounded",
    "moveset-menu-btn-open",
  ],
};
