<script setup lang="ts">
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
  <div class="flex flex-col gap-6">
    <div class="space-y-3">
      <p
        class="text-sm uppercase font-semibold tracking-[0.25em] text-[var(--color-accent)]"
      >
        {{ t('contact.section') }}
      </p>
      <h2
        class="text-3xl font-bold text-spray sm:text-4xl"
        :class="isLight ? 'text-slate-700' : 'text-white'"
      >
        {{ t('contact.titleLead') }}
        <span class="text-[var(--color-accent)]">{{ t('contact.titleAccent') }}</span>
      </h2>
      <p class="text-lg leading-relaxed" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
        {{ t('contact.subtitle') }}
      </p>
    </div>

    <div class="flex flex-wrap gap-2">
      <span
        v-for="(badge, idx) in t('contact.badges')"
        :key="badge"
        class="tag-sticker text-xs"
        :style="{ transform: `rotate(${idx % 2 === 0 ? -1.5 : 1}deg)` }"
      >
        {{ badge }}
      </span>
    </div>

    <div class="flex items-center gap-3">
      <span class="relative flex h-2.5 w-2.5">
        <span
          class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-[var(--color-accent)]"
        />
        <span
          class="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]"
        />
      </span>
      <span class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
        {{ t('contact.availability') }}
      </span>
    </div>

    <div class="flex gap-2 pt-2">
      <UButton
        v-for="social in socialLinks"
        :key="social.label"
        :icon="social.icon"
        :to="social.href"
        :target="social.href.startsWith('mailto') ? undefined : '_blank'"
        :rel="social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'"
        variant="outline"
        color="neutral"
        size="lg"
        class="rounded-lg hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
        :class="isLight ? 'border-slate-200 text-slate-600' : 'border-slate-700 text-slate-300'"
        :aria-label="social.label"
      />
    </div>
  </div>
</template>
