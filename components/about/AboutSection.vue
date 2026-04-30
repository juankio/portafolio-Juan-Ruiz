<script setup lang="ts">
import { inject, ref } from 'vue'
import AboutText from './AboutText.vue'
import AboutProfile from './AboutProfile.vue'
import AboutSkills from './AboutSkills.vue'

const isLight = inject('isLight', ref(false))

useScrollAnimation('.about-animate-trigger', {
  animation: {
    translateY: [40, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200
  },
  stagger: 150
})

useTextSplit('.split-text-about', { stagger: 15, duration: 700 })
</script>

<template>
  <UContainer
    as="section"
    id="sobre-mi"
    class="py-14 sm:py-20"
  >
    <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start about-animate-trigger animate-group">
      <!-- Left column -->
      <AboutText :is-light="isLight" />

      <!-- Right column -->
      <div class="space-y-6">
        <AboutProfile :is-light="isLight" />
        <AboutSkills :is-light="isLight" />
      </div>
    </div>
  </UContainer>
</template>
