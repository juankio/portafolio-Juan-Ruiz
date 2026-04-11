<script setup>
import AboutSection from '~/components/about/AboutSection.vue'
import AboutHero from '~/components/about/AboutHero.vue'
import EducationSection from '~/components/education/EducationSection.vue'

definePageMeta({ ssr: false })

const { isLight } = useThemeMode()
const { t } = useI18n()

const chips = computed(() => {
  const value = t('about.chips', {}, { returnObjects: true })
  return Array.isArray(value) ? value : ['Frontend', 'UX/UI', 'PWAs', 'Animacion']
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

    <UPageBody class="!mt-0 !space-y-0 pt-16 sm:pt-20 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-10 lg:gap-12">
        <AboutHero :is-light="isLight" :chips="chips" />
        <AboutSection :is-light="isLight" />
        <EducationSection :is-light="isLight" :education="education" :courses="courses" />
      </div>
    </UPageBody>
  </UPage>
</template>
