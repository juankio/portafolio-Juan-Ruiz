<script setup>
import { inject, ref } from 'vue'
import StreetButton from '~/components/ui/StreetButton.vue'

const props = defineProps({
  pending: { type: Boolean, default: false },
  onRefresh: { type: Function, default: null }
})

const isLight = inject('isLight', ref(false))
const { t } = useI18n()

// Splitting text specifically for this component's headline
useTextSplit('.split-text-projects', { stagger: 15, duration: 700 })

</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between projects-animate-trigger animate-group relative">
    <div class="animate-item opacity-0 relative z-10">
      <p class="text-sm uppercase tracking-[0.25em] mb-2" :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ t('projects.sectionTitle') }}</p>
      <h2 class="text-3xl font-bold text-spray sm:text-4xl lg:text-5xl split-text-projects text-balance" :class="isLight ? 'text-slate-700' : 'text-white'">
        {{ t('projects.headline') }}
        <span class="text-[var(--color-accent)]">{{ t('projects.headlineAccent') }}</span>
      </h2>
    </div>
    <div class="flex gap-4 items-center animate-item opacity-0 relative z-10">
      
      <!-- Hand-drawn arrow and text pointing to GitHub button -->
      <div class="absolute -left-36 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-[var(--color-accent)] opacity-80" style="transform: rotate(-5deg) translateY(-50%)">
        <span class="font-marker text-sm whitespace-nowrap">Explora el código</span>
        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg" class="overflow-visible stroke-current">
          <path d="M2 10 Q 20 0, 38 10" stroke-width="2" stroke-linecap="round" fill="none"/>
          <path d="M30 5 L 38 10 L 30 15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </div>

      <StreetButton
        href="https://github.com/juankio"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        class="street-btn--sm gap-2"
      >
        <UIcon name="i-simple-icons-github" class="w-5 h-5" />
        {{ t('projects.github') }}
      </StreetButton>
    </div>
  </div>
</template>
