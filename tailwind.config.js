/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        elevated: '#181818',
        primary: '#D4AF37',
        'primary-soft': '#E9CD7B',
        'primary-deep': '#8a6b1a',
        secondary: '#C0C0C0',
        accent: '#FF4D4D',
        success: '#22C55E',
        info: '#3B82F6',
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-50%)' },
        },
        floatY: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.5)' },
          '50%': { boxShadow: '0 0 0 14px rgba(212,175,55,0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        floatY: 'floatY 6s ease-in-out infinite',
        shine: 'shine 4s linear infinite',
        pulseGlow: 'pulseGlow 2.4s ease-out infinite',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 60%, #0a0a0a 100%), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 80px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 80px)',
      },
    },
  },
  plugins: [],
}
