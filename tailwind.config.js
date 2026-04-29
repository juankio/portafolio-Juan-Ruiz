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
      },
      colors: {
        accent: {
          DEFAULT: 'var(--color-accent)',
          light: 'var(--color-accent-light)',
          dark: 'var(--color-accent-dark)',
          soft: 'var(--color-accent-soft)',
          softer: 'var(--color-accent-softer)'
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          card: 'var(--color-surface-card)'
        },
        spray: {
          red: 'var(--spray-red)',
          yellow: 'var(--spray-yellow)',
          cyan: 'var(--spray-cyan)',
          pink: 'var(--spray-pink)',
          orange: 'var(--spray-orange)'
        },
        wall: 'var(--color-wall)',
        concrete: 'var(--color-concrete)'
      }
    }
  },
  plugins: []
}
