<script setup>
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl || 'https://mi-portafolio.com'

const { data, pending, error, refresh } = useLazyFetch('/api/github')

const featuredProjects = computed(() => {
  if (!data.value) return []
  return data.value.slice(0, 6)
})

const { t, locale } = useI18n()

useSeoMeta({
  title: computed(() => t('seo.index.title')),
  description: computed(() => t('seo.index.description')),
  keywords: computed(() => t('seo.index.keywords')),
  ogTitle: computed(() => t('seo.index.ogTitle')),
  ogDescription: computed(() => t('seo.index.ogDescription')),
  ogUrl: siteUrl,
  ogType: 'website',
  ogLocale: computed(() => t('seo.locale')),
  ogSiteName: 'Juan Miguel Ruiz Supelano',
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => t('seo.index.twitterTitle')),
  twitterDescription: computed(() => t('seo.index.twitterDescription')),
  twitterImage: `${siteUrl}/icons/pwa-512x512.png`
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  meta: computed(() => locale.value === 'es' ? [
    { name: 'geo.region', content: 'CO' },
    { name: 'geo.placename', content: 'Colombia' }
  ] : []),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${siteUrl}/#person`,
          "name": "Juan Miguel Ruiz Supelano",
          "alternateName": ["Juan Miguel Ruiz", "juankio", "Juanki"],
          "url": siteUrl,
          "image": `${siteUrl}/icons/pwa-512x512.png`,
          "jobTitle": t('seo.schema.jobTitle'),
          "description": t('seo.schema.description'),
          "homeLocation": {
            "@type": "Place",
            "name": "Colombia"
          },
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
          },
          "knowsAbout": [
            "Vue.js", "Nuxt 3", "React", "Angular", "TypeScript",
            "Desarrollo Frontend", "Diseño UI/UX", "Aplicaciones Web Rápidas", "PWA",
            "Desarrollo Web Remoto", "Node.js", "Freelancer Colombia"
          ],
          "knowsLanguage": ["es", "en"],
          "sameAs": [
            "https://github.com/juankio"
          ]
        },
        {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#service`,
          "name": "Juan Miguel Ruiz | Desarrollo Web",
          "description": "Desarrollo de software, páginas web ultrarrápidas y tiendas virtuales a medida.",
          "provider": { "@id": `${siteUrl}/#person` },
          "areaServed": [
            { "@type": "Country", "name": "Colombia" },
            { "@type": "Place", "name": "Latinoamérica" },
            { "@type": "Place", "name": "Remoto Global" }
          ],
          "availableLanguage": ["Spanish", "English"]
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Quién es Juan Miguel Ruiz?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Juan Miguel Ruiz es un desarrollador web Full-Stack y creador de páginas web rápidas basado en Colombia, que ofrece servicios freelance de forma remota a nivel internacional, especializado en Vue, Nuxt, Angular y automatizaciones con IA."
              }
            },
            {
              "@type": "Question",
              "name": "¿Qué servicios ofrece Juan Miguel Ruiz?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Ofrece desarrollo de páginas web ultrarrápidas, tiendas virtuales, PWAs y aplicaciones web a medida utilizando tecnologías modernas como Vue, Nuxt 3 y Tailwind CSS para clientes en Colombia y todo el mundo."
              }
            }
          ]
        }
      ]))
    }
  ]
})
</script>

<template>
  <div class="space-y-0">
    <HeroSection  />
    <AboutSection  />
    <ProjectsSection
      
      :projects="featuredProjects"
      :pending="pending"
      :error="error"
      :on-refresh="refresh"
    />
    <ContactSection  />
  </div>
</template>
