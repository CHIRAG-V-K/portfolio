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
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
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
  plugins: [],
}