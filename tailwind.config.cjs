/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        green: '#42b883',
        'gray-dark': '#0f172a',
      },
    },
  },
}
