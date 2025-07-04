/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '450px',
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        dmSans: ["DM Serif Text", "serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

