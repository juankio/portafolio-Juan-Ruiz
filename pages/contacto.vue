<script setup>
import ContactSection from '~/components/contact/ContactSection.vue'

const { isLight } = useThemeMode()
const siteUrl = useRuntimeConfig().public.siteUrl

useSeoMeta({
  title: 'Contacto — Contratar desarrollador freelance Vue & Nuxt | Juan Miguel Ruiz',
  description: '¿Buscas un desarrollador freelance Vue/Nuxt en Colombia? Contáctame para proyectos web, landings, dashboards o sitios a medida. Disponible remoto desde Villavicencio.',
  keywords: 'contratar desarrollador freelance Colombia, contacto programador Vue Nuxt, hire freelance developer Colombia, contratar frontend Villavicencio, desarrollo web a medida Colombia, programador freelance remoto',
  ogTitle: 'Contactar a Juan Miguel Ruiz Supelano | Freelance Developer',
  ogDescription: 'Disponible para proyectos freelance en Vue, Nuxt y Tailwind. Trabajo remoto desde Villavicencio, Colombia.',
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
  <main
    class="relative min-h-screen bg-brick"
    :class="isLight ? 'text-slate-800' : 'text-slate-200'"
  >
    <div class="absolute inset-0 bg-concrete pointer-events-none" />
    <UContainer class="relative z-10 py-12 sm:py-16 lg:py-20">
      <ContactSection :is-light="isLight" />
    </UContainer>
  </main>
</template>
