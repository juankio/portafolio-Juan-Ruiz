// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  modules: ['@nuxt/image', '@nuxt/ui', '@vueuse/motion/nuxt', 'lenis/nuxt', '@nuxt/fonts'],
  image: {
    domains: ['opengraph.githubassets.com', 'avatars.githubusercontent.com', 's.wordpress.com']
  },
  ui: {
    fonts: false
  },
  icon: {
    provider: 'server',
    fallbackToApi: false,
    serverBundle: {
      collections: ['heroicons', 'ph', 'lucide', 'circle-flags']
    }
  },
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFrom: process.env.RESEND_FROM || 'Portafolio <portafolio@example.com>',
    resendFallbackFrom: process.env.RESEND_FALLBACK_FROM || '',
    contactTo: process.env.CONTACT_EMAIL || 'contacto@juanmiguel.dev',
    public: {
      siteUrl: 'https://mi-portafolio.com',
      motion: {
        directives: {
          'pop-bottom': {
            initial: { scale: 0, opacity: 0, y: 100 },
            visible: { scale: 1, opacity: 1, y: 0 }
          }
        }
      }
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Juan Miguel Ruiz Supelano' },
        { name: 'theme-color', content: '#111827' },
        { name: 'google-site-verification', content: 'RLgwbyq0cBTAEwSW7SSmuT7Z81h3BgOYhW-N4C3h1pg' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💻</text></svg>' },
        { rel: 'apple-touch-icon', href: '/icons/pwa-512x512.png' }
      ]
    }
  },
  experimental: {
    appManifest: false,
    inlineSSRStyles: true,
    payloadExtraction: true
  },
  nitro: {
    prerender: {
      routes: ['/', '/sobre-mi', '/proyectos', '/contacto']
    },
    compressPublicAssets: true
  }

})
