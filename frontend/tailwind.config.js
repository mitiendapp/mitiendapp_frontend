/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}"
    ],
    theme: {
      extend: {
        colors:{
          'button-blue': '#427ED7',
          'button-purple': '#8F0AE6',
        }
      },
    },
    plugins: [],
  }