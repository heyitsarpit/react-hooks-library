module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}
