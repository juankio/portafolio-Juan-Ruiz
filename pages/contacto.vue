<script setup>
import ContactSection from '~/components/contact/ContactSection.vue'

const siteUrl = useRuntimeConfig().public.siteUrl

const { t } = useI18n()

useSeoMeta({
  title: computed(() => t('seo.contact.title')),
  description: computed(() => t('seo.contact.description')),
  keywords: computed(() => t('seo.contact.keywords')),
  ogTitle: computed(() => t('seo.contact.ogTitle')),
  ogDescription: computed(() => t('seo.contact.ogDescription')),
  ogUrl: `${siteUrl}/contacto`,
  ogType: 'website',
  ogImage: `${siteUrl}/icons/pwa-512x512.png`,
  twitterCard: 'summary_large_image'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteUrl}/contacto` }]
})
</script>

<template>
  <div class="space-y-0 py-4 sm:py-8 lg:py-12">
    <ContactSection  />
  </div>
</template>
