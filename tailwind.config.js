/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      mainFont: ["Source Code Pro", 'monospace'],
      cursive: ["Julee", "cursive"],
      cursive2: ["Satisfy", "cursive"]
    },
    extend: {
      colors: {
        primary: "#fdba74",
        secondary: "#3b82f6",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/unsplash.jpg')",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.shadow-inner-depth': {
          '--tw-shadow': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.2)',
          '--tw-shadow-colored': 'inset 0 2px 4px 0 var(--tw-shadow-color)',
          'box-shadow': 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)',
        },
        '.shadow-card': {
          '--tw-shadow': ' 0px 25px 130px -20px #ffffff',
          '--tw-shadow-colored': ' 0px 25px 130px -20px var(--tw-shadow-color)',
          'box-shadow': 'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)'
        }
      };
      addUtilities(newUtilities);
    }
  ],
}