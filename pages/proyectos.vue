<script setup>
import ProjectsSection from '~/components/ProjectsSection.vue'

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
    class="relative min-h-screen overflow-hidden"
    :class="isLight ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#0c0c0d] text-slate-200'"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-6 top-10 h-64 w-64 rounded-full blur-3xl"
        :class="isLight ? 'bg-red-400/35' : 'bg-red-500/18'"
      />
      <div
        class="absolute right-10 top-16 h-72 w-72 rounded-full blur-3xl"
        :class="isLight ? 'bg-slate-300/50' : 'bg-gray-300/8'"
      />
      <div
        class="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full blur-3xl"
        :class="isLight ? 'bg-red-300/25' : 'bg-red-500/14'"
      />
    </div>

    <UContainer class="py-12 sm:py-16 lg:py-20">
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
