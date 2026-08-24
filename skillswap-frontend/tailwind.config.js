/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563EB', // Primary Deep Blue (Brand)
          900: '#1E3A8A', // Darker Blue
        },
        accent: {
          400: '#2dd4bf',
          500: '#14b8a6', // Teal
          600: '#0d9488',
        },
        cta: {
          400: '#fb923c',
          500: '#f97316', // Warm Coral/Orange
          600: '#ea580c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
