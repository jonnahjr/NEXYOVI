/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accents
        'nx-blue':    '#2563EB',
        'nx-blue-lt': '#60A5FA',
        'nx-cyan':    '#06b6d4',
        'nx-emerald': '#10b981',
        'nx-violet':  '#8b5cf6',
        // Backgrounds
        'nx-bg':      '#050816',
        'nx-bg-2':    '#07111f',
        'nx-bg-3':    '#0b1020',
        'nx-card':    'rgba(17,24,39,0.8)',
        // Legacy
        'orange': {
          DEFAULT: '#ff8964',
          500:     '#ff8964',
        },
        'grey': {
          10: '#18191b',
          20: '#303236',
          30: '#4a4b50',
          40: '#61656b',
          50: '#797d86',
          60: '#95979e',
          70: '#b0b2b7',
          80: '#c9cbcf',
          90: '#e5e5e7',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:  ['Roboto Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise':             "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'glow':       '0 0 40px rgba(37,99,235,0.35)',
        'glow-lg':    '0 0 80px rgba(37,99,235,0.25)',
        'glow-cyan':  '0 0 40px rgba(6,182,212,0.25)',
        'glow-em':    '0 0 40px rgba(16,185,129,0.25)',
        'card':       '0 25px 50px rgba(0,0,0,0.5)',
        'card-hover': '0 40px 80px rgba(0,0,0,0.6)',
      },
      animation: {
        'marquee':      'marquee 25s linear infinite',
        'marquee-rev':  'marquee-reverse 28s linear infinite',
        'pulse-slow':   'pulse-slow 4s ease-in-out infinite',
        'float':        'float 5s ease-in-out infinite',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'gradient':     'gradient-shift 6s ease infinite',
        'shimmer':      'shimmer 2.5s infinite',
        'scan':         'scan 3s linear infinite',
        'fade-in':      'fade-in 0.6s ease-out forwards',
        'slide-up':     'slide-up 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'spin-slow':    'spin 8s linear infinite',
        'ping-slow':    'ping 3s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3' },
          '50%':      { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(37,99,235,0.3)' },
          '50%':      { boxShadow: '0 0 50px rgba(37,99,235,0.7)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
