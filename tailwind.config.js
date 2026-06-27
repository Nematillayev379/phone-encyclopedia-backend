/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#06b6d4',
        accent: '#f59e0b',
        dark: '#0f172a',
        'dark-light': '#1e293b',
        'gray-dark': '#334155',
      },
    },
  },
  plugins: [],
}
