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
          DEFAULT: '#FF8C42',
          dark: '#E67A30',
          light: '#FFA666',
        },
        background: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 20s infinite ease-in-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(50px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-50px, 50px) scale(0.9)' },
        }
      }
    },
  },
  plugins: [],
}
