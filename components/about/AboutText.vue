<script setup lang="ts">
import { inject, ref, computed } from 'vue'

const isLight = inject('isLight', ref(false))

const { t } = useI18n()

const aboutChips = computed(() => {
  const chips = t('about.chips')
  return Array.isArray(chips) ? chips : []
})
</script>

<template>
  <div class="space-y-6">
    <!-- Section label -->
    <span
      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent-soft)] text-[var(--color-accent)] animate-item opacity-0 uppercase tracking-widest"
    >
      {{ t('about.sectionTitle') }}
    </span>

    <!-- Headline -->
    <div class="relative animate-item opacity-0">
      <h2 class="text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight split-text-about text-balance text-spray" :class="isLight ? 'text-slate-700' : 'text-white'">
        {{ t('about.headline.lead') }}
        <span class="text-[var(--color-accent)]">{{ t('about.headline.accent') }}</span>
        {{ t('about.headline.tail') }}
      </h2>
    </div>

    <!-- Intro text -->
    <p class="text-base leading-relaxed max-w-xl animate-item opacity-0" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
      {{ t('about.intro') }}
    </p>

    <!-- Chips -->
    <div class="flex flex-wrap gap-2 pt-1 animate-item opacity-0">
      <span
        v-for="chip in aboutChips"
        :key="chip"
        class="about-chip px-3 py-1 text-xs font-medium rounded-full border border-[var(--color-border)] bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] cursor-default transition-all duration-300"
      >
        {{ chip }}
      </span>
    </div>

    <!-- CTAs -->
    <div class="flex flex-wrap gap-4 pt-3 animate-item opacity-0">
      <UButton to="/proyectos" size="md" class="font-semibold shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 rounded-xl" :ui="{ base: 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] text-white' }">
        {{ t('hero.ctas.projects') }}
      </UButton>
      <UButton to="/contacto" size="md" variant="ghost" class="font-semibold hover:bg-[var(--color-surface-elevated)] transition-all duration-300 rounded-xl" :class="isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white'">
        {{ t('hero.ctas.contact') }}
      </UButton>
    </div>
  </div>
</template>

<style scoped>
/* Chip hover */
.about-chip {
  transition: all 0.3s ease;
}

.about-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
</style>
