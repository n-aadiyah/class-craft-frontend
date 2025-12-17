/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      /* COLORS */
      colors: {
        primary: "#1173d4",
        "background-light": "#f6f7f8",
        "background-dark": "#101922",
      },

      /* FONTS */
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },

      /* BACKGROUND IMAGES */
      backgroundImage: {
        "hero-animated":
          "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')",
      },

      /* KEYFRAMES */
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bgPan: {
          "0%": { backgroundPosition: "50% 50%", backgroundSize: "100%" },
          "50%": { backgroundPosition: "55% 45%", backgroundSize: "110%" },
          "100%": { backgroundPosition: "50% 50%", backgroundSize: "100%" },
        },
      },

      /* ANIMATIONS */
      animation: {
        fadeIn: "fadeIn 1.2s ease forwards",
        slideUp: "slideUp 1.2s ease forwards",
        slideLeft: "slideLeft 1.2s ease forwards",
        slideRight: "slideRight 1.2s ease forwards",
        zoomIn: "zoomIn 0.8s ease forwards",
        bgPan: "bgPan 18s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};
