/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#34cccc',
        secondary: '#3f3f45',
        tertiary: '#ffcc01',
        dark: '#232225',
        light: '#eff2f5',
        lighter: '#f5f8f9',
        'disabled-100': '#e5e7eb',
        'disabled-500': '#6b7280',
      },
    },
  },
  plugins: [],
};
