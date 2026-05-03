<script setup lang="ts">
defineProps<{
  to?: string
  href?: string
  variant?: 'primary' | 'ghost'
  target?: string
  rel?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}>()

defineEmits<{ click: [MouseEvent] }>()
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
    v-else-if="href"
    :href="href"
    :target="target"
    :rel="rel"
    class="street-btn"
    :class="variant === 'ghost' ? 'street-btn--ghost' : 'street-btn--primary'"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type || 'button'"
    :disabled="disabled"
    class="street-btn"
    :class="variant === 'ghost' ? 'street-btn--ghost' : 'street-btn--primary'"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.street-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 12px;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
  border: 1px solid transparent;
}

.street-btn.street-btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  border-radius: 8px;
}

.street-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.street-btn--primary {
  color: white;
  background: var(--color-accent);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.street-btn--primary:hover {
  background: var(--color-accent-soft);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 12px var(--color-accent-soft);
}

.street-btn--ghost {
  color: var(--color-text-primary);
  background: var(--color-surface-card);
  border: 1px solid var(--color-border);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.street-btn--ghost:hover {
  color: var(--color-text-primary);
  background: var(--color-surface-elevated);
  border-color: var(--color-border-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}
</style>
