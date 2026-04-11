<script setup lang="ts">
defineProps<{
  overline?: string
  lead?: string
  accent?: string
  tail?: string
  isLight?: boolean
}>()
</script>

<template>
  <div class="space-y-3">
    <p
      v-if="overline"
      class="text-sm uppercase font-semibold"
      style="letter-spacing: 0.25em; color: var(--color-accent)"
    >
      {{ overline }}
    </p>
    <h2
      class="text-3xl font-semibold sm:text-4xl"
      style="color: var(--color-text-primary)"
    >
      {{ lead }} <span v-if="accent" style="color: var(--color-accent)">{{ accent }}</span>{{ tail ? ` ${tail}` : '' }}
    </h2>
    <slot />
  </div>
</template>
