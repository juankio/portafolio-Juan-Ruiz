<script setup>
import AboutSection from '~/components/about/AboutSection.vue'
import EducationSection from '~/components/education/EducationSection.vue'

const { isLight } = useThemeMode()
const { t } = useI18n()

const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: computed(() => t('seo.about.title')),
  description: computed(() => t('seo.about.description')),
  keywords: computed(() => t('seo.about.keywords')),
  ogTitle: computed(() => t('seo.about.ogTitle')),
  ogDescription: computed(() => t('seo.about.ogDescription')),
  ogUrl: `${siteUrl}/sobre-mi`,
  ogType: 'profile',
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/sobre-mi` }]
})

const education = computed(() => {
  const value = t('education.education')
  return Array.isArray(value) ? value : []
})

const courses = computed(() => {
  const value = t('education.courses')
  return Array.isArray(value) ? value : []
})
</script>

<template>
  <div class="flex flex-col gap-8 lg:gap-12 py-4 sm:py-8 lg:py-12">
    <AboutSection :is-light="isLight" />
    <EducationSection :is-light="isLight" :education="education" :courses="courses" />
  </div>
</template>
