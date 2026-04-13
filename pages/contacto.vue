<script setup>
import ContactSection from '~/components/contact/ContactSection.vue'

const { isLight } = useThemeMode()
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
