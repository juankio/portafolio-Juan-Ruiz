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
  <div :class="stacked ? 'nav-actions w-full' : 'nav-actions items-center'">
    <div
      class="lang-switch"
      :class="isLight ? 'lang-switch--light' : 'lang-switch--dark'"
      role="group"
      aria-label="Language switch"
    >
      <UButton
        v-for="item in localeItems"
        :key="item.code"
        size="sm"
        variant="ghost"
        :class="[
          'lang-btn',
          locale === item.code
            ? isLight
              ? 'lang-btn--active-light'
              : 'lang-btn--active-dark'
            : isLight
              ? 'text-slate-700'
              : 'text-slate-300'
        ]"
        @click="setLocale(item.code)"
      >
        {{ item.label }}
      </UButton>
    </div>

    <UButton
      to="/proyectos"
      size="sm"
      variant="soft"
      class="nav-cta"
      :class="[
        isLight
          ? 'border border-emerald-400/70 bg-emerald-500 text-white hover:bg-emerald-600'
          : 'border border-red-400/70 bg-red-500 text-white hover:bg-red-600',
        stacked ? 'w-full justify-center' : ''
      ]"
    >
      {{ t('nav.ctaProjects') }}
    </UButton>

    <UButton
      size="sm"
      variant="outline"
      :icon="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      class="theme-btn"
      :class="[
        isLight
          ? 'border-emerald-400/80 text-emerald-700 hover:bg-emerald-100'
          : 'border-red-400/80 text-red-200 hover:bg-red-500/15',
        stacked ? 'self-start' : ''
      ]"
      :aria-label="t('nav.themeToggle')"
      @click="emit('toggle-mode')"
    />
  </div>
</template>

<style scoped>
.nav-actions {
  display: flex;
  gap: 0.6rem;
  font-family: 'Segoe UI', 'Inter', 'Roboto', system-ui, sans-serif;
}

.lang-switch {
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid;
  padding: 2px;
}

.lang-switch--light {
  border-color: rgba(16, 185, 129, 0.45);
  background: rgba(16, 185, 129, 0.08);
}

.lang-switch--dark {
  border-color: rgba(248, 113, 113, 0.45);
  background: rgba(239, 68, 68, 0.1);
}

.lang-btn {
  min-width: 42px;
  border-radius: 8px;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.lang-btn--active-light {
  background: #10b981;
  color: #fff;
}

.lang-btn--active-dark {
  background: #ef4444;
  color: #fff;
}

.nav-cta {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 10px;
}

.theme-btn {
  border-radius: 10px;
}

@media (max-width: 1023px) {
  .nav-actions {
    width: 100%;
    flex-direction: column;
  }
}
</style>
