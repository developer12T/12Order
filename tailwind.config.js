module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '600px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      kanit: ["Kanit", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}