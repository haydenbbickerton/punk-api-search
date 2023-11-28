module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "wobble": "wobble 1s infinite"
      },
      keyframes: {
        "wobble": { "0%": { "transform": "rotate(-5deg)" }, "25%": { "transform": "rotate(5deg)" }, "50%": { "transform": "rotate(-5deg)" }, "75%": { "transform": "rotate(5deg)" }, "100%": { "transform": "rotate(-5deg)" } },
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover']
    }
  },
  plugins: [],
};
