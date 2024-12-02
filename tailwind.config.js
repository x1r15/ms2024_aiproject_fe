/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s infinite ease-in-out',
        'gradient-shift-slow': 'gradient-shift-slow 18s infinite ease-in-out',
        'gradient-shift-slower': 'gradient-shift-slower 20s infinite ease-in-out',
        'glow-pulse': 'glow-pulse 10s infinite ease-in-out',
        'glow-pulse-slow': 'glow-pulse-slow 15s infinite ease-in-out',
        'glow-pulse-slower': 'glow-pulse-slower 18s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
