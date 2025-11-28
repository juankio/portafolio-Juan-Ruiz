// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  modules: ['@nuxt/image', '@nuxt/ui'],
  css: ['~/assets/css/tailwind.css'],
  experimental: {
    // Avoid dev fetch to /_nuxt/builds/meta/dev.json
    appManifest: false
  }
})
