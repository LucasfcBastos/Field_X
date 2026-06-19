/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#33C758',
        'primary-dark': '#008112',
        secondary: '#015A4A',
        'secondary-alt': '#5A1C01',
      },
      fontFamily: {
        heading: ['BebasNeue'],
        body: ['Nunito'],
      },
    },
  },
  plugins: [],
}
