<script setup>
import { inject, ref } from 'vue'

const isLight = inject('isLight', ref(false))

const socialLinks = [
  { icon: 'i-ph-github-logo-fill', href: 'https://github.com/juankio', label: 'GitHub' },
  { icon: 'i-ph-linkedin-logo-fill', href: 'https://www.linkedin.com/in/juan-miguel-ruiz-300037276/', label: 'LinkedIn' }
]
</script>

<template>
  <div class="flex items-center gap-2 mobile-stagger-item opacity-0">
    <a
      v-for="social in socialLinks"
      :key="social.label"
      :href="social.href"
      target="_blank"
      rel="noopener noreferrer"
      class="mobile-control-btn flex items-center justify-center w-10 h-10"
      :class="isLight ? 'mobile-control-btn--light' : ''"
      :aria-label="social.label"
    >
      <UIcon :name="social.icon" class="h-5 w-5" />
    </a>
  </div>
</template>

<style scoped>
.mobile-control-btn {
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-accent);
  border-radius: 12px;
  background: var(--color-surface-card);
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.mobile-control-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.mobile-control-btn--light {
  color: var(--color-text-tertiary);
  border-color: rgba(15, 23, 42, 0.15);
}

.mobile-control-btn--light:hover {
  color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
}
</style>