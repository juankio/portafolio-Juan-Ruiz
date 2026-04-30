<script setup>
import { inject, ref } from 'vue'
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import ProjectsHeader from './ProjectsHeader.vue'
import ProjectsGrid from './ProjectsGrid.vue'

const props = defineProps({
  projects: { type: Array, default: () => [] },
  pending: { type: Boolean, default: false },
  error: { type: Object, default: null },
  onRefresh: { type: Function, default: null },
})

const isLight = inject('isLight', ref(false))

useScrollAnimation('.projects-animate-trigger', {
  animation: {
    translateY: [40, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1000
  },
  stagger: 100
})
</script>

<template>
  <UContainer
    as="section"
    id="proyectos"
    class="relative py-14 sm:py-20"
  >
    <SpraySplatter class="absolute -top-6 -right-4" size="lg" :opacity="0.08" />

    <ProjectsHeader 
      :pending="pending"
      :on-refresh="onRefresh"
    />

    <ProjectsGrid 
      :projects="projects"
      :pending="pending"
      :error="error"
    />
  </UContainer>
</template>
