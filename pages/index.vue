<script setup>
const { isLight } = useThemeMode()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl || 'https://mi-portafolio.com'

const { data, pending, error, refresh } = useLazyAsyncData('github-starred-repos', async () => {
  // Ahora traemos los repos que juankio le ha dado "star"
  const repos = await $fetch('https://api.github.com/users/juankio/starred?sort=created&per_page=50', {
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
    // Solo mostrar proyectos donde juankio sea el dueño
    .filter((repo) => repo.owner.login === 'juankio')
    .slice(0, 6)
})

useSeoMeta({
  title: 'Juan Miguel Ruiz Supelano | Desarrollador Freelance Vue & Nuxt | Villavicencio, Colombia',
  description: 'Desarrollador web freelance en Villavicencio, Meta, Colombia. Especializado en Vue.js, Nuxt 3, Tailwind CSS y diseño UI/UX. Contratación remota para startups y empresas en Latinoamérica.',
  keywords: 'desarrollador freelance, programador freelance, freelance developer Colombia, freelancer Villavicencio, programador Villavicencio, desarrollador web Villavicencio, programador Meta Colombia, contratar desarrollador Vue, contratar programador Nuxt, desarrollador remoto Colombia, freelance Vue Nuxt, Juan Miguel Ruiz, Juan Miguel Ruiz Supelano, Supelano, juankio, Vue.js, Nuxt 3, Tailwind CSS, frontend developer Colombia, diseñador UI Colombia, desarrollo web Latinoamérica, programador fullstack freelance, Angular, Flask, Anime.js, Prompt Engineering, Claude AI',
  ogTitle: 'Juan Miguel Ruiz Supelano | Desarrollador Freelance Vue & Nuxt en Colombia',
  ogDescription: 'Freelance frontend developer en Villavicencio, Colombia. Construyo interfaces modernas con Vue.js, Nuxt 3 y Tailwind. Disponible para proyectos remotos.',
  ogUrl: siteUrl,
  ogType: 'website',
  ogLocale: 'es_CO',
  ogSiteName: 'Juan Miguel Ruiz Supelano',
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Juan Miguel Ruiz Supelano | Freelance Vue & Nuxt Developer',
  twitterDescription: 'Desarrollador freelance en Villavicencio, Colombia. Vue.js, Nuxt 3, Tailwind CSS. Proyectos remotos en Latinoamérica.',
  twitterImage: `${siteUrl}/icons/pwa-512x512.png`
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
        "alternateName": ["Juan Miguel", "Juan Miguel Ruiz", "juankio", "Juanki"],
        "url": siteUrl,
        "image": `${siteUrl}/icons/pwa-512x512.png`,
        "jobTitle": "Desarrollador Frontend Freelance · Vue & Nuxt",
        "description": "Desarrollador web freelance especializado en Vue.js, Nuxt 3 y diseño UI/UX. Trabaja de forma remota desde Villavicencio, Colombia para clientes en Latinoamérica y el mundo.",
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
          "name": "Desarrollador Web Freelance",
          "occupationLocation": {
            "@type": "City",
            "name": "Villavicencio, Colombia"
          },
          "skills": "Vue.js, Nuxt 3, TypeScript, Tailwind CSS, Node.js, Express, MongoDB, Angular, Flask, Anime.js, Prompt Engineering, diseño UI/UX, desarrollo frontend, desarrollo fullstack"
        },
        "knowsAbout": [
          "Vue.js", "Nuxt.js", "Nuxt 3", "JavaScript", "TypeScript", "Angular",
          "Tailwind CSS", "Node.js", "Express", "MongoDB", "Flask", "Anime.js", "Prompt Engineering",
          "Desarrollo Web", "Diseño UI", "Diseño UX",
          "Desarrollo Frontend", "Desarrollo Fullstack", "Freelance"
        ],
        "knowsLanguage": ["es", "en"],
        "areaServed": [
          { "@type": "Country", "name": "Colombia" },
          { "@type": "Place", "name": "Latinoamérica" },
          { "@type": "Place", "name": "Remoto / Global" }
        ],
        "availableLanguage": ["Spanish", "English"],
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
