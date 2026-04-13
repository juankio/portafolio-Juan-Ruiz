<script setup>
import AboutSection from '~/components/about/AboutSection.vue'
import EducationSection from '~/components/education/EducationSection.vue'

const { isLight } = useThemeMode()
const { t } = useI18n()

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
    class="sobre-mi-wall relative min-h-screen bg-brick"
    :class="isLight ? 'text-slate-800' : 'text-slate-200'"
  >
    <!-- Full page concrete overlay -->
    <div class="absolute inset-0 bg-concrete pointer-events-none" />

    <UPageBody class="relative z-10 !mt-0 !space-y-0 pt-12 sm:pt-16 lg:pt-20 pb-16">
      <div class="flex flex-col gap-8 lg:gap-12">
        <AboutSection :is-light="isLight" />
        <EducationSection :is-light="isLight" :education="education" :courses="courses" />
      </div>
    </UPageBody>
  </UPage>
</template>
