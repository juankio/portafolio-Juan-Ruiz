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

const { data, pending, error, refresh } = await useAsyncData('github-repos', async () => {
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
    .slice(0, 12)
})
</script>

<template>
  <main
    class="relative min-h-screen bg-brick"
    :class="isLight ? 'text-slate-800' : 'text-slate-200'"
  >
    <div class="absolute inset-0 bg-concrete pointer-events-none" />
    <UContainer class="relative z-10 py-12 sm:py-16 lg:py-20">
      <ProjectsSection
        :is-light="isLight"
        :projects="featuredProjects"
        :pending="pending"
        :error="error"
        :on-refresh="refresh"
      />
    </UContainer>
  </main>
</template>
