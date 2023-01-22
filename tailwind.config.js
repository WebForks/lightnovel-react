/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: `jit`,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",'./public/index.html',
  ],
  theme: {
    extend: {
      boxShadow: {'3xl' : `0px 13px 10px -7px rgba(0, 0, 0, 0.1)`,},
      spacing: {'100': '29rem', "460": "460px", "555": "555px"},
      transitionProperty: {'custom-all': 'all',},
      transitionDuration: {'0.4': '0.4s'},
      transitionTimingFunction: {'custom-timing': 'cubic-bezier(0.175, 0.885, 0, 1)'},
    },
  },
  plugins: [],
}