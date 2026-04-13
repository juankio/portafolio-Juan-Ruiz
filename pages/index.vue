<script setup>
const { isLight } = useThemeMode()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl || 'https://mi-portafolio.com'

const { data, pending, error, refresh } = useLazyAsyncData('github-repos', async () => {
  const repos = await $fetch('https://api.github.com/users/juankio/repos?sort=updated&per_page=50', {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'nuxt-portfolio'
    }
  })
  return repos
})

const featuredProjects = computed(() => {
  if (!data.value) return []
  return [...data.value]
    .filter((repo) => !repo.fork)
    .sort((a, b) => {
      if (b.stargazers_count === a.stargazers_count) {
        return new Date(b.updated_at) - new Date(a.updated_at)
      }
      return b.stargazers_count - a.stargazers_count
    })
    .slice(0, 6)
})

useSeoMeta({
  title: 'Juan Miguel Ruiz Supelano | Desarrollador Vue y Nuxt | Villavicencio, Colombia',
  description: 'Portafolio de Juan Miguel Ruiz Supelano. Programador web en Villavicencio, Colombia, especializado en Vue.js, Nuxt 3, Tailwind CSS y diseño de interfaces.',
  keywords: 'Juan Miguel, Juan Miguel Ruiz, Juan Miguel Ruiz Supelano, Supelano, juankio, programadores Villavicencio, programadores Colombia, desarrollador web Villavicencio, Vue, Vue.js, Nuxt, Nuxt 3, desarrollador frontend, diseñador UI, web developer',
  ogTitle: 'Juan Miguel Ruiz Supelano | Frontend Developer en Colombia',
  ogDescription: 'Desarrollador y diseñador web en Villavicencio, Colombia. Proyectos en Vue.js y Nuxt.',
  ogUrl: siteUrl,
  ogType: 'website',
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Juan Miguel Ruiz Supelano | Programador Web Colombia',
  twitterDescription: 'Portafolio de desarrollo frontend, especializado en el ecosistema Vue y Nuxt.'
})

useHead({
  link: [
    { rel: 'canonical', href: siteUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Juan Miguel Ruiz Supelano",
        "alternateName": ["Juan Miguel", "Juan Miguel Ruiz", "juankio"],
        "url": siteUrl,
        "image": `${siteUrl}/icons/pwa-512x512.png`,
        "jobTitle": "Desarrollador Frontend y Diseñador UI/UX",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Villavicencio",
          "addressCountry": "CO"
        },
        "knowsAbout": ["Vue.js", "Nuxt.js", "JavaScript", "TypeScript", "Tailwind CSS", "Desarrollo Web", "Diseño UI"],
        "sameAs": [
          "https://github.com/juankio"
        ]
      })
    }
  ]
})
</script>

<template>
  <UPage
    class="relative min-h-screen bg-brick"
    :class="isLight ? 'text-slate-800' : 'text-slate-200'"
  >
    <div class="absolute inset-0 bg-concrete pointer-events-none" />
    <UPageBody class="relative z-10 !mt-0 !space-y-0 !pb-0">
      <HeroSection :is-light="isLight" />
      <LazyAboutSection :is-light="isLight" />
      <LazyProjectsSection
        :is-light="isLight"
        :projects="featuredProjects"
        :pending="pending"
        :error="error"
        :on-refresh="refresh"
      />
      <LazyContactSection :is-light="isLight" />
    </UPageBody>
  </UPage>
</template>
