/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{jsx,tsx}', './ui/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // enable all tailwind colors (in jit mode)
        ...colors
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
