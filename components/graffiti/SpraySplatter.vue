<script setup lang="ts">
const props = defineProps<{
  color?: string
  size?: 'sm' | 'md' | 'lg'
  opacity?: number
}>()

const sizeMap = { sm: 80, md: 140, lg: 220 }
const s = computed(() => sizeMap[props.size || 'md'])
const fill = computed(() => props.color || 'var(--color-accent)')
const op = computed(() => props.opacity ?? 0.15)

const dots = [
  { cx: 28, cy: 22, r: 6 },
  { cx: 55, cy: 15, r: 4 },
  { cx: 72, cy: 35, r: 8 },
  { cx: 18, cy: 58, r: 5 },
  { cx: 45, cy: 48, r: 10 },
  { cx: 80, cy: 62, r: 3 },
  { cx: 35, cy: 75, r: 7 },
  { cx: 62, cy: 80, r: 4 },
  { cx: 12, cy: 38, r: 3 },
  { cx: 88, cy: 18, r: 5 },
  { cx: 50, cy: 30, r: 2 },
  { cx: 22, cy: 85, r: 3 },
  { cx: 75, cy: 50, r: 6 },
  { cx: 40, cy: 62, r: 2 },
  { cx: 90, cy: 85, r: 4 },
]
</script>

<template>
  <svg
    :width="s"
    :height="s"
    viewBox="0 0 100 100"
    class="pointer-events-none"
    aria-hidden="true"
    :style="{ opacity: op }"
  >
    <circle
      v-for="(d, i) in dots"
      :key="i"
      :cx="d.cx"
      :cy="d.cy"
      :r="d.r"
      :fill="fill"
      :opacity="0.3 + (i % 5) * 0.14"
    />
  </svg>
</template>
