/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '180': '180deg', // Tailwind already supports 180deg rotation
      },
      transform: {
        'rotate-y-180': 'rotateY(180deg)',
      },
      transitionDuration: {
        '600': '600ms',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
          '.backface-hidden': {
              'backface-visibility': 'hidden',
          },
          '.backface-visible': {
              'backface-visibility': 'visible',
          },
      }, ['responsive', 'hover']);
  }
  ],
}