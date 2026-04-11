<script setup>
import HeroSection from '~/components/hero/HeroSection.vue'
import AboutSection from '~/components/about/AboutSection.vue'
import ProjectsSection from '~/components/projects/ProjectsSection.vue'
import ContactSection from '~/components/contact/ContactSection.vue'

definePageMeta({ ssr: false })

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
    :class="[
      'relative min-h-screen overflow-hidden',
      isLight ? 'bg-gray-300 text-slate-800' : 'bg-gray-900 text-slate-200'
    ]"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-red-500/20' : 'bg-red-500/15'"
      />
      <div
        class="absolute right-10 top-20 h-80 w-80 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-slate-200/60' : 'bg-gray-300/10'"
      />
      <div
        class="absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-red-500/15' : 'bg-red-500/10'"
      />
    </div>

    <UPageBody class="!mt-0 !space-y-0 !pb-14 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-8 md:gap-10">
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
    </UPageBody>
  </UPage>
</template>
