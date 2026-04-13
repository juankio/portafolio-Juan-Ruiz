<script setup>
import HeroSection from '~/components/hero/HeroSection.vue'
import AboutSection from '~/components/about/AboutSection.vue'
import ProjectsSection from '~/components/projects/ProjectsSection.vue'
import ContactSection from '~/components/contact/ContactSection.vue'

const { isLight } = useThemeMode()
const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl || 'https://mi-portafolio.com'

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
    .slice(0, 6)
})

useSeoMeta({
  title: 'Juan Miguel Ruiz Supelano | Desarrollador y Disenador',
  description: 'Portafolio minimal y brutalista de Juan Miguel Ruiz Supelano: proyectos en Nuxt, Vue, Tailwind y PWAs.',
  ogTitle: 'Portafolio de Juan Miguel Ruiz Supelano',
  ogDescription: 'Proyectos en tiempo real desde GitHub, enfoque en PWAs, UX y rendimiento.',
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image'
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
      <AboutSection :is-light="isLight" />
      <ProjectsSection
        :is-light="isLight"
        :projects="featuredProjects"
        :pending="pending"
        :error="error"
        :on-refresh="refresh"
      />
      <ContactSection :is-light="isLight" />
    </UPageBody>
  </UPage>
</template>
