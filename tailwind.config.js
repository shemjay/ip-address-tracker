/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ["rubik", "serif"]
      },
      fontSize: {
        base: '18px',
      },
      colors: {
        VeryDarkGray: 'hsl(0, 0%, 17%)',
        DarkGray: 'hsl(0, 0%, 59%)',
      },
      fontWeight: {
        light: 400,
        regular: 500,
        bold: 700,
      },
    },
  },
  plugins: [require('daisyui')],
}

