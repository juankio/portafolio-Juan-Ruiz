<script setup lang="ts">
import GlowCard from '~/components/ui/GlowCard.vue'

defineProps<{
  isLight: boolean
}>()

const { t } = useI18n()

const socialLinks = [
  { icon: 'i-ph-github-logo-fill', href: 'https://github.com/juankio', label: 'GitHub' },
  { icon: 'i-ph-linkedin-logo-fill', href: 'https://www.linkedin.com/in/juan-miguel-ruiz-supelano', label: 'LinkedIn' },
  { icon: 'i-heroicons-envelope-20-solid', href: 'mailto:contacto@juanmiguel.dev', label: 'Email' }
]
</script>

<template>
  <GlowCard :is-light="isLight" rounded="rounded-3xl" body-padding="p-6 sm:p-7 lg:p-8" :float="true" :motion="true">
    <div class="flex flex-col gap-6">
      <!-- Header -->
      <div class="space-y-3">
        <p
          class="text-sm uppercase font-semibold"
          style="letter-spacing: 0.25em; color: var(--color-accent)"
        >
          {{ t('contact.section') }}
        </p>
        <h2
          class="text-3xl font-semibold sm:text-4xl"
          style="color: var(--color-text-primary)"
        >
          {{ t('contact.titleLead') }}
          <span style="color: var(--color-accent)">{{ t('contact.titleAccent') }}</span>
        </h2>
        <p class="text-lg" style="color: var(--color-text-secondary)">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <!-- Badges -->
      <div class="flex flex-wrap gap-3">
        <span
          v-for="badge in t('contact.badges')"
          :key="badge"
          class="rounded-full px-3 py-1.5 text-sm font-semibold"
          style="background: var(--color-accent-soft); color: var(--color-accent)"
        >
          {{ badge }}
        </span>
      </div>

      <!-- Availability indicator -->
      <div class="flex items-center gap-3">
        <span class="relative flex h-3 w-3">
          <span
            class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
            style="background: var(--color-accent)"
          />
          <span
            class="inline-flex h-3 w-3 rounded-full"
            style="background: var(--color-accent)"
          />
        </span>
        <span class="text-sm font-medium" style="color: var(--color-text-primary)">
          {{ t('contact.availability') }}
        </span>
      </div>

      <!-- Social links -->
      <div class="flex gap-3 pt-2">
        <UButton
          v-for="social in socialLinks"
          :key="social.label"
          :icon="social.icon"
          :to="social.href"
          :target="social.href.startsWith('mailto') ? undefined : '_blank'"
          :rel="social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'"
          variant="outline"
          size="lg"
          class="rounded-full contact-social"
          :aria-label="social.label"
        />
      </div>
    </div>
  </GlowCard>
</template>

<style scoped>
.contact-social {
  border-color: var(--color-border-accent);
  color: var(--color-accent);
  transition: all var(--duration-normal) var(--ease-default);
}
.contact-social:hover {
  background: var(--color-accent-soft);
  transform: translateY(-2px);
}
</style>
