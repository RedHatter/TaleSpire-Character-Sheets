module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: theme('colors.gray.500', 'currentColor'),
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-elevation')()
  ],
}
