/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'Theme-color': '#F2994A',
        'Theme-color1': '#ececec',
        'Theme-color2': '#333333',
        'Theme-color3': '#212121',
        'black': '#000',
        'white': '#fff',
      },
    },
  },
  plugins: [],
}

