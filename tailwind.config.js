/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-out forwards',
        'loading': 'loading 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        loading: {
          '0%': { width: '0%' },
          '50%': { width: '75%' },
          '100%': { width: '100%' },
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};