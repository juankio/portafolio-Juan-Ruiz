<script setup>
defineProps({
  isLight: { type: Boolean, default: false },
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
    <div
      class="flex items-center rounded-xl border p-1"
      :class="isLight ? 'border-slate-200 bg-slate-100' : 'border-slate-700 bg-slate-800'"
      role="group"
      aria-label="Language switch"
    >
      <UButton
        v-for="item in localeItems"
        :key="item.code"
        size="sm"
        variant="ghost"
        class="min-w-[44px] rounded-lg text-sm font-bold tracking-wide"
        :class="[
          locale === item.code
            ? 'bg-[var(--color-accent)] text-white'
            : isLight
              ? 'text-slate-500 hover:text-slate-700'
              : 'text-slate-400 hover:text-white'
        ]"
        @click="setLocale(item.code)"
      >
        {{ item.label }}
      </UButton>
    </div>

    <UButton
      to="/proyectos"
      size="md"
      class="text-sm font-bold uppercase tracking-[0.06em] rounded-xl"
      :class="[
        'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]',
        stacked ? 'w-full justify-center' : ''
      ]"
    >
      {{ t('nav.ctaProjects') }}
    </UButton>

    <UButton
      size="md"
      variant="ghost"
      color="neutral"
      :icon="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      class="rounded-xl"
      :class="stacked ? 'self-start' : ''"
      :aria-label="t('nav.themeToggle')"
      @click="emit('toggle-mode')"
    />
  </div>
</template>
