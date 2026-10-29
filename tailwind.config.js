/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          DEFAULT: '#070600',
          50: '#2A2612',
          100: '#221F0E',
          200: '#1A180A',
          300: '#141208',
          400: '#0E0C04',
          500: '#070600',
          surface: '#0D0C07',
          card: '#12110A',
          border: 'rgba(247, 247, 255, 0.09)',
        },
        ghost: {
          DEFAULT: '#F7F7FF',
          muted: 'rgba(247, 247, 255, 0.68)',
          subtle: 'rgba(247, 247, 255, 0.42)',
          faint: 'rgba(247, 247, 255, 0.15)',
        },
        pink: {
          DEFAULT: '#EA526F',
          glow: 'rgba(234, 82, 111, 0.35)',
          muted: 'rgba(234, 82, 111, 0.15)',
        },
        turquoise: {
          DEFAULT: '#23B5D3',
          glow: 'rgba(35, 181, 211, 0.35)',
          muted: 'rgba(35, 181, 211, 0.15)',
        },
        electric: {
          DEFAULT: '#279AF1',
          glow: 'rgba(39, 154, 241, 0.35)',
          muted: 'rgba(39, 154, 241, 0.15)',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 24s linear infinite',
        'spin-reverse': 'spin-reverse 30s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}

