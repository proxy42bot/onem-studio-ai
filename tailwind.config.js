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
        gallery: {
          bg:          '#F5F4F0',
          surface:     '#FFFFFF',
          border:      '#1A1A1A',
          'border-soft':'#D4D2CC',
          text:        '#0D0D0D',
          'text-mid':  '#5A5A5A',
          'text-muted':'#9A9898',
          accent:      '#1A1A1A',
          alert:       '#C8102E',
          hover:       '#F0EEE8',
        }
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'Georgia', 'serif'],
        sans:  ['"Inter"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono:  ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        'display': ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'widget-title': ['15px', { lineHeight: '1.3' }],
        'label':   ['10px', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        'body':    ['13px', { lineHeight: '1.5' }],
        'caption': ['11px', { lineHeight: '1.4' }],
        'mono':    ['11px', { lineHeight: '1.5' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '40px',
      },
      borderRadius: {
        'gallery': '2px',
      },
    },
  },
  plugins: [],
}
