// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: '.',
  modules: ['@nuxt/image', '@nuxt/ui', '@vueuse/motion/nuxt'],
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
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://fonts.cdnfonts.com' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Bangers&family=Inter:wght@400;500;600;700&display=swap'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.cdnfonts.com/css/druk-wide-trial'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.cdnfonts.com/css/druk-text-wide-trial'
        }
      ]
    }
  },
  experimental: {
    appManifest: false
  },
  nitro: {
    prerender: {
      routes: ['/', '/sobre-mi', '/proyectos', '/contacto']
    }
  }

})
