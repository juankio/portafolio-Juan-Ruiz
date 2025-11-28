// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  modules: ['@nuxt/image', '@nuxt/ui', '@vite-pwa/nuxt'],
  css: ['~/assets/css/tailwind.css'],
  runtimeConfig: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFrom: process.env.RESEND_FROM || 'Portafolio <portafolio@example.com>',
    resendFallbackFrom: process.env.RESEND_FALLBACK_FROM || '',
    contactTo: process.env.CONTACT_EMAIL || 'contacto@juanmiguel.dev',
    public: {
      siteUrl: 'https://mi-portafolio.com'
    }
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Portafolio de Juan Miguel Ruiz Supelano',
      short_name: 'Portafolio',
      description: 'Portafolio web minimal y brutalista de Juan Miguel Ruiz Supelano',
      theme_color: '#0f0f10',
      background_color: '#0f0f10',
      display: 'standalone',
      lang: 'es',
      icons: [
        {
          src: '/icons/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icons/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,webp,ico}']
    }
  },
  experimental: {
    appManifest: false
  }
})
