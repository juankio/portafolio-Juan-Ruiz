<script setup>
import ProjectsSection from '~/components/projects/ProjectsSection.vue'

const siteUrl = useRuntimeConfig().public.siteUrl

const { data, pending, error, refresh } = useLazyFetch('/api/github')

const featuredProjects = computed(() => {
  if (!data.value) return []
  return data.value.slice(0, 12)
})

const { t } = useI18n()

useSeoMeta({
  title: computed(() => t('seo.projects.title')),
  description: computed(() => t('seo.projects.description')),
  keywords: computed(() => t('seo.projects.keywords')),
  ogTitle: computed(() => t('seo.projects.ogTitle')),
  ogDescription: computed(() => t('seo.projects.ogDescription')),
  ogUrl: `${siteUrl}/proyectos`,
  ogType: 'website',
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/proyectos` }]
})
</script>

<template>
  <div class="space-y-0 py-4 sm:py-8 lg:py-12">
    <ProjectsSection
      
      :projects="featuredProjects"
      :pending="pending"
      :error="error"
      :on-refresh="refresh"
    />
  </div>
</template>
