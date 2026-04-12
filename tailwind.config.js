/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Bangers"', '"Druk Text Wide Trial"', '"Druk Wide Trial"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Bangers"', '"Druk Wide Trial"', '"Druk Text Wide Trial"', 'Inter', 'system-ui', 'sans-serif'],
        marker: ['"Permanent Marker"', '"Bangers"', 'cursive'],
        body: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
