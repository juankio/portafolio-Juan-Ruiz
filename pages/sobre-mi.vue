<script setup>
import AboutSection from '~/components/about/AboutSection.vue'
import EducationSection from '~/components/education/EducationSection.vue'

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
  link: [{ rel: 'canonical', href: `${siteUrl}/sobre-mi` }],
  script: [
    {
      type: 'application/ld+json',
      children: computed(() => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateModified: new Date().toISOString(),
        mainEntity: {
          '@type': 'Person',
          name: 'Juan Miguel Ruiz Supelano',
          alternateName: 'juankio',
          jobTitle: t('seo.schema.jobTitle'),
          description: t('seo.schema.description'),
          url: `${siteUrl}/sobre-mi`,
          image: `${siteUrl}/icons/pwa-512x512.png`,
          sameAs: [
            'https://github.com/juankio',
            'https://www.linkedin.com/in/juan-miguel-ruiz-supelano/'
          ],
          knowsAbout: ['Vue.js', 'Nuxt 3', 'Angular', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'AI Agents'],
          alumniOf: [
            {
              '@type': 'CollegeOrUniversity',
              name: 'Universidad Cooperativa de Colombia'
            },
            {
              '@type': 'CollegeOrUniversity',
              name: 'Corporacion Universitaria Minuto de Dios'
            }
          ]
        }
      }))
    }
  ]
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
    <AboutSection  />
    <EducationSection  :education="education" :courses="courses" />
  </div>
</template>
