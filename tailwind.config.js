/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#15803d",
          dark: "#14532d",
        },
        secondary: {
          DEFAULT: "#6ee7b7",
          dark: "#14532d",
        },
      },
      backgroundImage: {
        'light-bg': "url('/green2.jpg')",
        'dark-bg': "url('/black.jpg')",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '3rem',
          sm: '5rem',
        },
      },
      animation: {
        "spin-slow": "spin 5s linear infinite", // Slow Rotation
      },
    },
  },
  plugins: [],
};
