import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#080c10',
        'bg-secondary': '#0d1117',
        'bg-tertiary': '#161b22',
        'accent-green': '#00ff88',
        'accent-cyan': '#00d4ff',
        'accent-purple': '#bd93f9',
        'accent-orange': '#ff8c00',
        'accent-red': '#ff4757',
        'text-primary': '#e6edf3',
        'text-secondary': '#7d8590',
        'text-muted': '#4a5568',
      },
      fontFamily: {
        display: ['Orbitron', 'Share Tech Mono', 'monospace'],
        mono: ['IBM Plex Mono', 'Space Mono', 'monospace'],
        sans: ['Inter', 'DM Sans', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'typing-cursor': 'blink 1s step-end infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
        'glitch-1': 'glitch-1 2s infinite linear alternate-reverse',
        'glitch-2': 'glitch-2 3s infinite linear alternate-reverse',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 255, 136, 0.3), 0 0 10px rgba(0, 255, 136, 0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.6), 0 0 40px rgba(0, 255, 136, 0.3)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100vh)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        'glitch-1': {
          '0%': { clipPath: 'inset(40% 0 61% 0)', transform: 'translate(-2px, 2px)' },
          '20%': { clipPath: 'inset(92% 0 1% 0)', transform: 'translate(1px, -1px)' },
          '40%': { clipPath: 'inset(43% 0 1% 0)', transform: 'translate(-1px, 3px)' },
          '60%': { clipPath: 'inset(25% 0 58% 0)', transform: 'translate(3px, 1px)' },
          '80%': { clipPath: 'inset(54% 0 7% 0)', transform: 'translate(-3px, -2px)' },
          '100%': { clipPath: 'inset(58% 0 43% 0)', transform: 'translate(2px, -3px)' },
        },
        'glitch-2': {
          '0%': { clipPath: 'inset(65% 0 13% 0)', transform: 'translate(3px, -1px)' },
          '20%': { clipPath: 'inset(10% 0 85% 0)', transform: 'translate(-2px, 2px)' },
          '40%': { clipPath: 'inset(70% 0 2% 0)', transform: 'translate(2px, -3px)' },
          '60%': { clipPath: 'inset(30% 0 50% 0)', transform: 'translate(-3px, 1px)' },
          '80%': { clipPath: 'inset(80% 0 5% 0)', transform: 'translate(1px, 3px)' },
          '100%': { clipPath: 'inset(5% 0 90% 0)', transform: 'translate(-1px, -2px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
