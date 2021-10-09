/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{jsx,tsx}',
    './ui/**/*.{jsx,tsx}',
    '../packages/**/demo.{jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // enable all tailwind colors (in jit mode)
        ...colors,
        brand: 'var(--brand)',
        'bg-1': 'var(--bg-1)',
        'bg-2': 'var(--bg-2)',
        'fg-1': 'var(--fg-1)',
        'txt-1': 'var(--txt-1)',
        'txt-2': 'var(--txt-2)'
      },
      fontFamily: {
        mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
