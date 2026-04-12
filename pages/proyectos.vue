<script setup>
import ProjectsSection from '~/components/projects/ProjectsSection.vue'

definePageMeta({ ssr: false })

const { isLight } = useThemeMode()

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
