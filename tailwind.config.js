module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      kanit: ["Kanit", "sans-serif"],
      sarabun: ["Sarabun", "sans-serif"],
    },
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
]
}