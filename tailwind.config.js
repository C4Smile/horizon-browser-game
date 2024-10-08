/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#f0f0f0",
      "white-hover": "#c2c7cc",
      "dark-hover": "#636362",
      "placeholder-dark": "#636362",
      "dark-background2": "#222222",
      "dark-background": "#1b1b1b",
      "light-background2": "#f0f0f0",
      "light-background": "#e3e3e3",
      primary: "#333399",
      plight: "#444499",
      pdark: "#000059",
      secondary: "#f50057",
      slight: "#f73378",
      sdark: "#ab003c",
      "pdark-hover-full": "#000059dd",
      "pdark-hover": "#00005939",
      "p2dark-hover": "#00005970",
      "dark-drawer-background": "#222222ce",
      "light-drawer-background": "#e3e3e3ce",
      error: "#CC0000",
      warning: "#FF8800",
      success: "#007733",
      info: "#0099CC",
    },
    extend: {
      fontSize: {
        body: "1rem",
        h3: "calc(20px + 39 * ((100vw - 320px)/1680))",
        h4: "calc(18px + 30 * ((100vw - 320px)/1680))",
        h5: "calc(15px + 20 * ((100vw - 320px)/1680))",
        h6: "calc(14px + 15 * ((100vw - 320px)/1680))",
        footer: "13px",
        sctitle: "14px",
        stars: "12px",
      },
      top: {
        list: "75px",
      },
      marginTop: {
        small: "5px",
      },
      borderRadius: {
        scard: "15px",
        button: "30px",
        circle: "100%",
      },
      gap: {
        small: "10px",
        basic: "20px",
        medium: "40px",
      },
      padding: {
        button: "5px 20px",
        error: "3rem",
        navbar: "20px",
      },
      minHeight: {
        12: "3rem",
      },
      height: {
        400: "400px",
        "90vh": "90vh",
        "80vh": "80vh",
        navbar: "60px",
        viewport: "100vh",
        scard: "180px", // small card
        icon: "35px",
      },
      display: {
        none: "none",
      },

      maxHeight: {
        400: "400px",
        viewport: "100vh",
        scard: "180px",
      },
      minWidth: {
        "small-th": "70px",
        large: "200px",
      },
      width: {
        99: "99%",
        icon: "35px",
        half: "50%",
        "80per": "80%",
        viewport: "100vw",
        scard: "180px",
        "small-th": "70px",
        large: "200px",
      },
      maxWidth: {
        scard: "180px",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [],
};
