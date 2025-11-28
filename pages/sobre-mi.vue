<script setup>
import AboutSection from '~/components/AboutSection.vue'

definePageMeta({ ssr: false })

const { isLight } = useThemeMode()
</script>

<template>
  <main
    class="relative min-h-screen overflow-hidden"
    :class="isLight ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#0c0c0d] text-slate-100'"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-4 top-10 h-64 w-64 rounded-full blur-3xl"
        :class="isLight ? 'bg-red-400/35' : 'bg-red-500/18'"
      />
      <div
        class="absolute right-10 top-16 h-72 w-72 rounded-full blur-3xl"
        :class="isLight ? 'bg-slate-300/50' : 'bg-white/8'"
      />
      <div
        class="absolute -bottom-10 left-1/3 h-72 w-72 rounded-full blur-3xl"
        :class="isLight ? 'bg-red-300/25' : 'bg-red-500/14'"
      />
    </div>

    <UContainer class="py-12 sm:py-16 lg:py-20">
      <AboutSection :is-light="isLight" />
    </UContainer>
  </main>
</template>
