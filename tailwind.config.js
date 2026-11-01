/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          bg: '#07060f',
          sidebar: '#0a0916',
          card: 'rgba(20, 16, 52, 0.55)',
          raised: '#1a1636',
          line: 'rgba(212, 175, 55, 0.16)',
          'line-soft': 'rgba(255, 255, 255, 0.08)',
        },
        midnight: '#07060f',
        dusk: '#2a2a48',
        night: '#14103c',
        violet: {
          DEFAULT: '#7c3aed',
          deep: '#3b1d8a',
          mist: '#5b4aa8',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#e8d08a',
          dark: '#b8922e',
          muted: '#8a6b2e',
        },
        cream: {
          DEFAULT: '#f5ecd6',
          muted: '#b8b0a0',
        },
        success: '#38B77A',
        warning: '#E8A33E',
        danger: '#E34F55',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      boxShadow: {
        card: '0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-hover': '0 28px 70px rgba(20,16,60,0.55), 0 0 0 1px rgba(212,175,55,0.22)',
        gold: '0 0 0 1px rgba(212,175,55,0.28), 0 0 40px rgba(212,175,55,0.12)',
        glow: '0 0 80px rgba(124,58,237,0.25)',
      },
      borderRadius: {
        xl: '1rem',
      },
      letterSpacing: {
        cinzel: '0.22em',
      },
      animation: {
        'fade-in': 'fadeIn 0.55s ease-out',
        'rise': 'rise 0.9s ease-out',
        'glow-pulse': 'glowPulse 5s ease-in-out infinite',
        'drift': 'drift 18s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(2%, -3%, 0)' },
        },
      },
    },
  },
  plugins: [],
};
