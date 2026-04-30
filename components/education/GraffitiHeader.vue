<script setup lang="ts">
defineProps<{ isLight: boolean }>()
const { t } = useI18n()
</script>

<template>
  <div class="relative z-10 px-6 sm:px-8 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
    <div class="relative">
      <p class="text-sm uppercase tracking-[0.25em] mb-2" :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ t('education.summary') }}</p>
      <h3 class="text-3xl font-bold text-spray sm:text-4xl split-text-wall text-balance" :class="isLight ? 'text-slate-700' : 'text-white'">
        {{ t('education.learningPath') }} <span class="text-[var(--color-accent)]">{{ t('education.learningPathAccent') }}</span>
      </h3>
    </div>
    
    <!-- Helper text with street style -->
    <div class="flex items-center gap-3">
      <span class="text-sm font-marker" :class="isLight ? 'text-slate-500' : 'text-slate-400'" style="letter-spacing: 0.04em">
        {{ t('education.hint') }}
      </span>
      <UIcon name="i-heroicons-hand-raised-solid" class="w-5 h-5 text-[var(--color-accent)] animate-bounce" />
    </div>
  </div>
</template>
