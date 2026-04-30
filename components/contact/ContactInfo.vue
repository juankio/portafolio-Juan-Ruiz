<script setup lang="ts">
defineProps<{
  isLight: boolean
}>()

const { t, locale } = useI18n()

const socialLinks = [
  { icon: 'i-ph-github-logo-fill', href: 'https://github.com/juankio', label: 'GitHub' },
  { icon: 'i-ph-linkedin-logo-fill', href: 'https://www.linkedin.com/in/juan-miguel-ruiz-300037276/', label: 'LinkedIn' },
  { icon: 'i-heroicons-envelope-20-solid', href: 'mailto:contacto@juanmiguel.dev', label: 'Email' }
]
</script>

<template>
  <div class="flex flex-col gap-6 ">
    <div class="space-y-3">
      <p
        class="text-sm uppercase font-semibold tracking-[0.25em] text-[var(--color-accent)]"
      >
        {{ t('contact.section') }}
      </p>
      <h2
        class="text-3xl font-bold text-spray sm:text-4xl split-text-contact text-balance"
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
      <a
        v-for="social in socialLinks"
        :key="social.label"
        :href="social.href"
        :target="social.href.startsWith('mailto') ? undefined : '_blank'"
        :rel="social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'"
        class="contact-social-btn"
        :class="isLight ? 'contact-social-btn--light' : ''"
        :aria-label="social.label"
      >
        <UIcon :name="social.icon" class="h-5 w-5" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.contact-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  color: var(--color-text-secondary);
  background: var(--color-surface-card);
  border: 2px solid var(--color-border-accent);
  border-radius: 4px 10px 5px 8px;
  backdrop-filter: blur(8px);
  transition: all 0.25s var(--ease-spring);
}

.contact-social-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 0 12px var(--color-accent-soft);
  transform: translateY(-2px) rotate(-1deg);
}

.contact-social-btn--light {
  color: var(--color-text-tertiary);
  border-color: rgba(15, 23, 42, 0.15);
}

.contact-social-btn--light:hover {
  color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
  box-shadow: 2px 2px 0 var(--color-accent-soft), 0 0 8px var(--color-accent-softer);
}
</style>
