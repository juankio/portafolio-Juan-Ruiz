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
  <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between projects-animate-trigger animate-group">
    <div class="animate-item opacity-0">
      <p class="text-sm uppercase tracking-[0.25em] mb-2" :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ t('projects.sectionTitle') }}</p>
      <h2 class="text-3xl font-bold text-spray sm:text-4xl lg:text-5xl split-text-projects text-balance" :class="isLight ? 'text-slate-700' : 'text-white'">
        {{ t('projects.headline') }}
        <span class="text-[var(--color-accent)]">{{ t('projects.headlineAccent') }}</span>
      </h2>
    </div>
    <div class="flex gap-3 animate-item opacity-0">
      <StreetButton
        v-if="onRefresh"
        variant="primary"
        class="street-btn--sm"
        :disabled="pending"
        @click="onRefresh && onRefresh()"
      >
        {{ t('projects.refresh') }}
      </StreetButton>
      <StreetButton
        href="https://github.com/juankio"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        class="street-btn--sm"
      >
        {{ t('projects.github') }}
      </StreetButton>
    </div>
  </div>
</template>
