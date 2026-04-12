<script setup lang="ts">
defineProps<{
  color?: string
  count?: number
  animated?: boolean
}>()
</script>

<template>
  <svg
    class="pointer-events-none"
    :width="(count || 3) * 20 + 10"
    height="50"
    viewBox="0 0 70 50"
    aria-hidden="true"
  >
    <path
      v-for="i in (count || 3)"
      :key="i"
      :d="`M ${10 + (i - 1) * 22} 0 L ${10 + (i - 1) * 22} ${22 + (i % 3) * 8} Q ${10 + (i - 1) * 22} ${30 + (i % 3) * 8} ${10 + (i - 1) * 22 + 2} ${32 + (i % 3) * 8} Q ${10 + (i - 1) * 22 + 3} ${34 + (i % 3) * 8} ${10 + (i - 1) * 22} ${36 + (i % 3) * 8}`"
      :fill="color || 'var(--color-accent)'"
      :opacity="0.5 + (i % 3) * 0.15"
      stroke-linecap="round"
      :stroke="color || 'var(--color-accent)'"
      stroke-width="3"
    >
      <animate
        v-if="animated !== false"
        attributeName="opacity"
        :values="`0;${0.5 + (i % 3) * 0.15}`"
        :dur="`${0.8 + i * 0.3}s`"
        fill="freeze"
      />
    </path>
  </svg>
</template>
