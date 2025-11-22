/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color:{
        'purple-main': '#AF8FE9',
      },
    },
  },
  plugins: [],
}

