/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forge: {
          bg: '#080c16',
          surface: '#0d1322',
          card: '#131c30',
          cardHover: '#18243e',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(56, 189, 248, 0.3)',
          cyan: '#06b6d4',
          blue: '#3b82f6',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          purple: '#a855f7',
          pink: '#ec4899',
          amber: '#f59e0b',
          emerald: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-violet': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
        'glow-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
