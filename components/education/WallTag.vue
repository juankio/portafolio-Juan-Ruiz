<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import WallTagSticker from './WallTagSticker.vue'
import WallTagGraffiti from './WallTagGraffiti.vue'
import WallTagPoster from './WallTagPoster.vue'

const isLight = inject('isLight', ref(false))

const props = defineProps<{
  course: {
    title: string; period: string; place?: string; detail?: string
  }
  index: number
  isSelected: boolean
}>()

const emit = defineEmits<{ select: [] }>()

const rotation = computed(() => {
  const angles = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2, 2.8]
  return angles[props.index % angles.length]
})
const number = computed(() => props.index + 1 < 10 ? `0${props.index + 1}` : `${props.index + 1}`)
const tagAccent = computed(() => {
  const colors = ['var(--spray-red)', 'var(--spray-cyan)', 'var(--spray-yellow)', 'var(--spray-pink)', 'var(--spray-orange)']
  return colors[props.index % colors.length]
})
</script>

<template>
  <button
    class="wall-tag group relative text-left transition-all duration-300"
    :class="[isSelected ? 'wall-tag--selected' : '', isLight ? 'wall-tag--light' : '']"
    :style="{
      '--tag-rotate': `${rotation}deg`,
      '--tag-accent': tagAccent,
      transform: `rotate(${rotation}deg)`
    }"
    :aria-label="`Ver detalle: ${course.title}`"
    :aria-expanded="isSelected"
    @click="emit('select')"
  >
    <WallTagSticker :period="course.period" />
    <WallTagGraffiti :number="number" :tag-accent="tagAccent" :is-selected="isSelected" />
    <WallTagPoster :course="course" :is-selected="isSelected" />
  </button>
</template>

<style scoped>
.wall-tag {
  position: relative;
  padding: 1.25rem 1rem 1.25rem 3rem;
  border-radius: 4px 12px 6px 10px;
  border: 2px solid var(--color-border);
  background: var(--color-surface-card);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s var(--ease-spring);
  max-width: 400px;
  width: 100%;
}
@media (min-width: 640px) { .wall-tag { padding: 1.25rem 1.5rem 1.25rem 3.5rem; } }
.wall-tag:hover {
  transform: rotate(0deg) scale(1.03) !important;
  box-shadow: 0 0 12px var(--tag-accent, var(--color-accent)), 0 0 32px rgba(0,0,0,0.3);
  border-color: var(--tag-accent, var(--color-accent));
}
.wall-tag--selected {
  border-color: var(--tag-accent, var(--color-accent));
  box-shadow: 0 0 12px var(--tag-accent, var(--color-accent)), 0 0 32px rgba(0,0,0,0.3);
}
.wall-tag--light { background: rgba(255, 255, 255, 0.92); }

/* Overrides for children hover/selected state */
.wall-tag:hover :deep(.wall-tag__number), .wall-tag--selected :deep(.wall-tag__number) { opacity: 0.4; }
.wall-tag:hover :deep(.wall-tag__spray), .wall-tag--selected :deep(.wall-tag__spray) { opacity: 1; }
.wall-tag:hover :deep(.wall-tag__glow), .wall-tag--selected :deep(.wall-tag__glow) { opacity: 0.6; }
.wall-tag--selected :deep(.wall-tag__title) { -webkit-line-clamp: unset; }
</style>
