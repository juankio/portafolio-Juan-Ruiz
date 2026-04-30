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
      siteUrl: 'https://juanmiguelruiz.lat',
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
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'author', content: 'Juan Miguel Ruiz Supelano' },
        { name: 'theme-color', content: '#ef4444' },
        { name: 'geo.region', content: 'CO-MET' },
        { name: 'geo.placename', content: 'Villavicencio, Meta, Colombia' },
        { name: 'geo.position', content: '4.142;-73.626' },
        { name: 'ICBM', content: '4.142, -73.626' },
        { name: 'google-site-verification', content: 'RLgwbyq0cBTAEwSW7SSmuT7Z81h3BgOYhW-N4C3h1pg' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icons/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/pwa-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icons/pwa-512x512.png' },
        { rel: 'shortcut icon', href: '/icons/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon.png' },
        { rel: 'apple-touch-icon', sizes: '512x512', href: '/icons/pwa-512x512.png' }
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
