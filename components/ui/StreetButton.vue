<script setup lang="ts">
defineProps<{
  to?: string
  href?: string
  variant?: 'primary' | 'ghost'
  target?: string
  rel?: string
}>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="street-btn"
    :class="variant === 'ghost' ? 'street-btn--ghost' : 'street-btn--primary'"
  >
    <slot />
  </NuxtLink>
  <a
    v-else
    :href="href"
    :target="target"
    :rel="rel"
    class="street-btn"
    :class="variant === 'ghost' ? 'street-btn--ghost' : 'street-btn--primary'"
  >
    <slot />
  </a>
</template>

<style scoped>
.street-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border: 2px solid var(--color-border-accent);
  border-radius: 3px 12px 5px 14px;
  backdrop-filter: blur(8px);
  transition: all 0.25s var(--ease-spring);
  text-decoration: none;
  cursor: pointer;
}

.street-btn--primary {
  color: white;
  background: var(--color-accent);
  border-color: var(--color-accent-dark);
  box-shadow: 2px 3px 0 var(--color-accent-dark);
}

.street-btn--primary:hover {
  background: var(--color-accent-dark);
  transform: translateY(-2px) rotate(-0.5deg);
  box-shadow: 3px 5px 0 var(--color-accent-dark), 0 0 16px var(--color-accent-soft);
}

.street-btn--ghost {
  color: var(--color-text-primary);
  background: var(--color-surface-card);
  box-shadow: 2px 3px 0 var(--color-accent-dark);
}

.street-btn--ghost:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  transform: translateY(-2px) rotate(-0.5deg);
  box-shadow: 3px 5px 0 var(--color-accent-dark), 0 0 16px var(--color-accent-soft);
}
</style>
