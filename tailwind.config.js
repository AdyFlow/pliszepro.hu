/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6A1A',
          deep: '#E8590C',
          light: '#FF8A3D',
          tint: '#FFF3EC',
          'tint-strong': '#FFEAD9',
        },
        ink: '#0E0E10',
        charcoal: '#18181B',
        cream: '#FAF9F7',
        'warm-white': '#FFFCF9',
        'warm-beige': '#FDF8F4',
        muted: '#6B6B70',
        line: '#ECECEC',
        'line-warm': '#F0E8E2',
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(14,14,16,0.06)',
        'card-warm': '0 4px 20px 0 rgba(255,106,26,0.06)',
        'card-hover': '0 8px 32px 0 rgba(255,106,26,0.12)',
        glow: '0 0 24px 4px rgba(255,106,26,0.25)',
        'glow-sm': '0 0 12px 2px rgba(255,106,26,0.15)',
        nav: '0 2px 12px 0 rgba(14,14,16,0.06)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulse_glow: {
          '0%, 100%': { boxShadow: '0 0 16px 2px rgba(255,106,26,0.3)' },
          '50%': { boxShadow: '0 0 28px 6px rgba(255,106,26,0.5)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        pulse_glow: 'pulse_glow 2.5s ease-in-out infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
