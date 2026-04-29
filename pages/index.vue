<script setup>
const { isLight } = useThemeMode()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl || 'https://mi-portafolio.com'

const { data, pending, error, refresh } = useLazyFetch('/api/github')

const featuredProjects = computed(() => {
  if (!data.value) return []
  return data.value.slice(0, 6)
})

const { t } = useI18n()

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
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Juan Miguel Ruiz Supelano",
        "alternateName": ["Juan Miguel", "Juan Miguel Ruiz", "juankio", "Juanki"],
        "url": siteUrl,
        "image": `${siteUrl}/icons/pwa-512x512.png`,
        "jobTitle": t('seo.schema.jobTitle'),
        "description": t('seo.schema.description'),
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Villavicencio",
          "addressRegion": "Meta",
          "addressCountry": "CO"
        },
        "workLocation": {
          "@type": "Place",
          "name": "Villavicencio, Meta, Colombia",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 4.142,
            "longitude": -73.626
          }
        },
        "hasOccupation": {
          "@type": "Occupation",
          "name": t('seo.schema.occupation'),
          "occupationLocation": {
            "@type": "City",
            "name": "Villavicencio, Colombia"
          },
          "skills": "Vue.js, Nuxt 3, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Angular, Flask, Anime.js, Prompt Engineering, UI/UX"
        },
        "knowsAbout": [
          "Vue.js", "Nuxt.js", "Nuxt 3", "JavaScript", "TypeScript", "Angular",
          "Tailwind CSS", "Node.js", "Express", "MongoDB", "Flask", "Anime.js", "Prompt Engineering"
        ],
        "knowsLanguage": ["es", "en"],
        "areaServed": [
          { "@type": "Country", "name": "Colombia" },
          { "@type": "Place", "name": "Latinoamérica" },
          { "@type": "Place", "name": "Remoto" }
        ],
        "availableLanguage": ["Spanish", "English"],
        "sameAs": [
          "https://github.com/juankio"
        ]
      }))
    }
  ]
})
</script>

<template>
  <div class="space-y-0">
    <HeroSection :is-light="isLight" />
    <AboutSection :is-light="isLight" />
    <ProjectsSection
      :is-light="isLight"
      :projects="featuredProjects"
      :pending="pending"
      :error="error"
      :on-refresh="refresh"
    />
    <ContactSection :is-light="isLight" />
  </div>
</template>
