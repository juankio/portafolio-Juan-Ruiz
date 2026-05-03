<script setup>
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
defineProps({
  
  stacked: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-mode'])

const { locale, setLocale, t } = useI18n()

const localeItems = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' }
]
</script>

<template>
  <div :class="stacked ? 'flex w-full flex-col gap-3' : 'flex items-center gap-3'">
    <!-- Language switch -->
    <div
      class="flex items-center p-1 rounded-xl border border-[var(--color-border-accent)] bg-[var(--color-surface-card)] shadow-sm"
      role="group"
      aria-label="Language switch"
    >
      <button
        v-for="item in localeItems"
        :key="item.code"
        class="min-w-[40px] px-3 py-1 text-sm font-semibold transition-all duration-300 rounded-lg"
        :class="[
          locale === item.code 
            ? 'bg-[var(--color-accent)] text-white shadow-md' 
            : 'bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-elevated)]',
          isLight && locale !== item.code 
            ? 'text-[var(--color-text-tertiary)] hover:text-[var(--color-accent-dark)]' 
            : ''
        ]"
        :aria-pressed="locale === item.code"
        @click="setLocale(item.code)"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- CTA -->
    <UButton
      to="/proyectos"
      size="md"
      class="font-semibold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 rounded-xl"
      :class="stacked ? 'w-full justify-center' : ''"
      :ui="{ base: 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] text-white' }"
    >
      {{ t('nav.ctaProjects') }}
    </UButton>

    <!-- Theme toggle -->
    <button
      class="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--color-border-accent)] bg-[var(--color-surface-card)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group"
      :class="[
        stacked ? 'self-start' : '', 
        isLight ? 'border-[rgba(15,23,42,0.15)] text-[var(--color-text-tertiary)] hover:border-[var(--color-accent-dark)] hover:text-[var(--color-accent-dark)]' : 'text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
      ]"
      :aria-label="t('nav.themeToggle')"
      @click="emit('toggle-mode')"
    >
      <UIcon
        :name="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        class="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
      />
    </button>
  </div>
</template>
