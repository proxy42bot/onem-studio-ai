/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg:       '#07070f',
          panel:    '#0d0d1a',
          border:   '#1a1a2e',
          neon:     '#00ff9f',
          pink:     '#ff00cc',
          yellow:   '#ffd700',
          blue:     '#00cfff',
          red:      '#ff3860',
          muted:    '#3a3a5c',
          text:     '#c8c8e8',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        mono:  ['"VT323"', 'monospace'],
      },
      boxShadow: {
        neon:   '0 0 8px #00ff9f, 0 0 20px #00ff9f33',
        pink:   '0 0 8px #ff00cc, 0 0 20px #ff00cc33',
        yellow: '0 0 8px #ffd700, 0 0 20px #ffd70033',
        blue:   '0 0 8px #00cfff, 0 0 20px #00cfff33',
        red:    '0 0 8px #ff3860, 0 0 20px #ff386033',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'blink':    'blink 1s step-end infinite',
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'flicker': 'flicker 4s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%':           { opacity: '0.8' },
          '97%':           { opacity: '1' },
          '98%':           { opacity: '0.6' },
          '99%':           { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
