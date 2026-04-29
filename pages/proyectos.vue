<script setup>
import ProjectsSection from '~/components/projects/ProjectsSection.vue'

const { isLight } = useThemeMode()
const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'Proyectos — Juan Miguel Ruiz Supelano | Portafolio Vue & Nuxt',
  description: 'Proyectos de desarrollo web con Vue.js, Nuxt 3, Tailwind CSS y Node.js. Trabajos freelance y open source de Juan Miguel Ruiz Supelano desde Villavicencio, Colombia.',
  keywords: 'proyectos Vue Nuxt, portafolio freelance Colombia, trabajos desarrollo web Villavicencio, ejemplos Nuxt 3, proyectos frontend Colombia, portfolio Juan Miguel Ruiz',
  ogTitle: 'Proyectos | Juan Miguel Ruiz Supelano',
  ogDescription: 'Portafolio de proyectos web construidos con Vue, Nuxt y Tailwind.',
  ogUrl: `${siteUrl}/proyectos`,
  ogType: 'website',
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/proyectos` }]
})

const { data, pending, error, refresh } = useLazyAsyncData('github-starred-repos', async () => {
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
    .slice(0, 12)
})
</script>

<template>
  <UPage
    class="relative min-h-screen bg-brick"
    :class="isLight ? 'text-slate-800' : 'text-slate-200'"
  >
    <div class="absolute inset-0 bg-concrete pointer-events-none" />
    <UPageBody class="relative z-10 !mt-0 !space-y-0 !pb-0">
      <ProjectsSection
        :is-light="isLight"
        :projects="featuredProjects"
        :pending="pending"
        :error="error"
        :on-refresh="refresh"
      />
    </UPageBody>
  </UPage>
</template>
