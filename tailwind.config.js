/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          light: '#faf7ef',
          DEFAULT: '#f5f1e6',
          dark: '#e5e1d6',
        },
      },
    },
  },
  plugins: [],
}

