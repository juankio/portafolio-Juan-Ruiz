<script setup lang="ts">
import { inject, ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import GraffitiHeader from './GraffitiHeader.vue'
import GraffitiDecorations from './GraffitiDecorations.vue'
import GraffitiTimeline from './GraffitiTimeline.vue'

interface CourseItem {
  title: string
  period: string
  place?: string
  detail?: string
}

defineProps<{
  courses: CourseItem[]
  selectedCourse: { title: string } | null
}>()

const emit = defineEmits<{
  select: [course: CourseItem]
}>()

const isLight = inject('isLight', ref(false))

// Animar los nodos del timeline
useScrollAnimation('.timeline-animate-trigger', {
  animation: {
    translateY: [30, 0],
    opacity: [0, 1],
    easing: 'easeOutQuart',
    duration: 1000
  },
  stagger: 150
})
</script>

<template>
  <div class="graffiti-wall relative overflow-hidden mt-12 pt-8 border-t-2 border-dashed border-white/10">
    <GraffitiHeader :is-light="isLight" />
    <GraffitiDecorations />
    <GraffitiTimeline 
      :courses="courses" 
      :selected-course="selectedCourse" 
      :is-light="isLight"
      @select="emit('select', $event)" 
    />
  </div>
</template>

<style scoped>
.graffiti-wall {
  position: relative;
  min-height: 400px;
}
</style>
