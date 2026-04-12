<script setup lang="ts">
const props = defineProps<{
  text: string
  index?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
}>()

const rotation = computed(() => {
  const idx = props.index ?? 0
  const angles = [-3, 2, -1.5, 2.5, -2, 1, -2.5, 3]
  return angles[idx % angles.length]
})

const sizeClasses = computed(() => {
  const s = props.size || 'md'
  if (s === 'sm') return 'px-3 py-1 text-xs'
  if (s === 'lg') return 'px-6 py-2.5 text-base'
  return 'px-4 py-1.5 text-sm'
})
</script>

<template>
  <span
    class="tag-sticker inline-block font-marker"
    :class="sizeClasses"
    :style="{
      transform: `rotate(${rotation}deg)`,
      background: color || 'var(--color-accent)',
    }"
  >
    {{ text }}
  </span>
</template>
