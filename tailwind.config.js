/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        futuristic: ['Orbitron', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in-out',
        'gradient-slow': 'gradient 8s linear infinite',
        'glow': 'glow 2.5s ease-in-out infinite',
        'orb-1': 'orb1 12s ease-in-out infinite',
        'orb-2': 'orb2 18s ease-in-out infinite',
        'orb-3': 'orb3 15s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,211,238,0.3), 0 0 20px 0 rgba(139,92,246,0.15)' },
          '50%': { boxShadow: '0 0 0 2px rgba(34,211,238,0.25), 0 0 30px 6px rgba(139,92,246,0.25)' },
        },
        orb1: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(50px, 50px)' },
          '66%': { transform: 'translate(-20px, 20px)' },
        },
        orb2: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(-30px, -50px)' },
          '66%': { transform: 'translate(20px, -20px)' },
        },
        orb3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
      backgroundSize: {
        'gradient-size': '400% 400%',
      },
    },
  },
  plugins: [],
}
