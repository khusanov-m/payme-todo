/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#34cccc',
        secondary: '#3f3f45',
        dark: '#232225',
      },
      gridTemplateColumns: {
        'autofill-335': 'repeat(auto-fill, minmax(350px, 1fr))',
      },
    },
  },
  plugins: [],
};
