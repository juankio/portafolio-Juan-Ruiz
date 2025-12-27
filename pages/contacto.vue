<script setup>
import ContactSection from '~/components/ContactSection.vue'

definePageMeta({ ssr: false })

const { isLight } = useThemeMode()
</script>

<template>
  <main
    class="relative min-h-screen overflow-hidden"
    :class="isLight ? 'bg-gray-300 text-slate-800' : 'bg-gray-900 text-slate-200'"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-6 top-10 h-64 w-64 rounded-full blur-3xl"
        :class="isLight ? 'bg-emerald-300/30' : 'bg-red-500/18'"
      />
      <div
        class="absolute right-10 top-16 h-72 w-72 rounded-full blur-3xl"
        :class="isLight ? 'bg-slate-200/50' : 'bg-gray-300/10'"
      />
      <div
        class="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full blur-3xl"
        :class="isLight ? 'bg-emerald-300/22' : 'bg-red-500/14'"
      />
    </div>

    <UContainer class="py-12 sm:py-16 lg:py-20">
      <ContactSection :is-light="isLight" />
    </UContainer>
  </main>
</template>
