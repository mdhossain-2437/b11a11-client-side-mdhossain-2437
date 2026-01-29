/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Dark mode palette
        background: '#0a0a0a', // Black
        surface: '#121212', // Dark Grey
        primary: '#D4AF37', // Gold
        secondary: '#C0C0C0', // Silver/Grey
        accent: '#FF4D4D', // Red for errors/actions
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Satoshi"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
