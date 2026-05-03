<script setup lang="ts">
const props = defineProps<{
  text: string
  index?: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
}>()

const sizeClasses = computed(() => {
  const s = props.size || 'md'
  if (s === 'sm') return 'px-2.5 py-0.5 text-[0.7rem]'
  if (s === 'lg') return 'px-4 py-2 text-sm'
  return 'px-3 py-1 text-xs'
})
</script>

<template>
  <span
    class="inline-flex items-center font-semibold rounded-full shadow-sm text-white"
    :class="sizeClasses"
    :style="{
      background: color || 'var(--color-accent)',
    }"
  >
    {{ text }}
  </span>
</template>
