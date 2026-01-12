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
        'neon-blue': '#00f3ff',
        'neon-purple': '#b967ff',
        'neon-pink': '#ff00ff',
        'cyber-dark': '#0a0a0f',
        'cyber-gray': '#1a1a2e',
        'hologram': 'rgba(0, 243, 255, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 2s infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
        'scan': 'scan 2s linear infinite',
        'gradient': 'gradient 8s linear infinite',
        'neon-flicker': 'neon-flicker 1.5s infinite',
        'particle': 'particle 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'neon-flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        },
        particle: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(-1000px) rotate(720deg)', opacity: 0 },
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
        'hologram-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #00f3ff 100%)',
        'neon-border': 'linear-gradient(90deg, #00f3ff, #b967ff, #ff00ff)',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 243, 255, 0.5)',
        'neon-purple': '0 0 20px rgba(185, 103, 255, 0.5)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.5)',
        'inner-neon': 'inset 0 0 20px rgba(0, 243, 255, 0.3)',
      },
    },
  },
  plugins: [],
}