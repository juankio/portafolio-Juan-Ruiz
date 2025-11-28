<script setup>
import NavBar from '~/components/NavBar.vue'
import HeroSection from '~/components/HeroSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import ProjectsSection from '~/components/ProjectsSection.vue'
import ContactSection from '~/components/ContactSection.vue'
import FooterBar from '~/components/FooterBar.vue'

definePageMeta({ ssr: false })

const runtimeConfig = useRuntimeConfig()
const siteUrl = runtimeConfig.public.siteUrl || 'https://mi-portafolio.com'

const isLight = ref(false)

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
  <main
    class="relative min-h-screen overflow-hidden"
    :class="isLight ? 'bg-white text-slate-900' : 'bg-[#0c0c0d] text-slate-100'"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-red-500/20' : 'bg-red-500/15'"
      />
      <div
        class="absolute right-10 top-20 h-80 w-80 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-slate-200/60' : 'bg-white/10'"
      />
      <div
        class="absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-red-500/15' : 'bg-red-500/10'"
      />
    </div>

    <NavBar :is-light="isLight" @toggle-mode="isLight = !isLight" />
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
    <FooterBar :is-light="isLight" />
  </main>
</template>
