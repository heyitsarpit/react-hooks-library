module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{jsx,tsx}', './components/**/*.{jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-text)',
        secondary: 'var(--color-text-secondary)',
        bg: 'var(--color-background)',
        nav: 'var(--color-nav-background)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-link-posts)'
      },
      animation: {
        gradient: 'gradient 10s ease infinite'
      },
      keyframes: {
        gradient: {
          '0%': { 'background-position': '0% 100%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 100%' }
        }
      },
      backgroundImage: {
        iridescent:
          'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)'
      },
      backgroundSize: {
        'zoom-350': '350% 350%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
