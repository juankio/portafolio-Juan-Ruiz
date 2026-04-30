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
    <!-- Language switch — mini tag stickers -->
    <div
      class="nav-lang-switch flex items-center p-1"
      role="group"
      aria-label="Language switch"
    >
      <button
        v-for="item in localeItems"
        :key="item.code"
        class="nav-lang-btn font-marker text-sm tracking-wide"
        :class="[
          locale === item.code ? 'nav-lang-btn--active' : 'nav-lang-btn--inactive',
          isLight && locale !== item.code ? 'nav-lang-btn--inactive-light' : ''
        ]"
        :aria-pressed="locale === item.code"
        @click="setLocale(item.code)"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- CTA — graffiti tag button -->
    <UButton
      to="/proyectos"
      size="md"
      class="nav-cta text-sm font-bold uppercase tracking-[0.06em]"
      :class="stacked ? 'w-full justify-center' : ''"
    >
      {{ t('nav.ctaProjects') }}
    </UButton>

    <!-- Theme toggle — spray can -->
    <button
      class="nav-theme-toggle flex items-center justify-center w-10 h-10"
      :class="[stacked ? 'self-start' : '', isLight ? 'nav-theme-toggle--light' : '']"
      :aria-label="t('nav.themeToggle')"
      @click="emit('toggle-mode')"
    >
      <UIcon
        :name="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        class="h-5 w-5 transition-transform duration-200"
      />
    </button>
  </div>
</template>

<style scoped>
.nav-lang-switch {
  border: 2px solid var(--color-border-accent);
  border-radius: 3px 8px 4px 6px;
  background: var(--color-surface-card);
}

.nav-lang-btn {
  min-width: 40px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s var(--ease-spring);
  border-radius: 2px 6px 3px 4px;
}

.nav-lang-btn--active {
  background: var(--color-accent);
  color: white;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.25);
}

.nav-lang-btn--inactive {
  background: transparent;
  color: var(--color-text-secondary);
}

.nav-lang-btn--inactive:hover {
  color: var(--color-accent);
}

.nav-lang-btn--inactive-light {
  color: var(--color-text-tertiary);
}

.nav-lang-btn--inactive-light:hover {
  color: var(--color-accent-dark);
}

.nav-cta {
  background: var(--color-accent) !important;
  color: white !important;
  border: none;
  border-radius: 3px 10px 5px 8px;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.3);
  transition: all 0.2s var(--ease-spring);
}

.nav-cta:hover {
  transform: translateY(-1px) rotate(-1deg);
  box-shadow: 4px 5px 0 rgba(0,0,0,0.25), 0 0 12px var(--color-accent-soft);
}

.nav-theme-toggle {
  color: var(--color-text-secondary);
  border: 2px solid var(--color-border-accent);
  border-radius: 4px 8px 3px 6px;
  background: var(--color-surface-card);
  cursor: pointer;
  transition: all 0.2s var(--ease-spring);
}

.nav-theme-toggle:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  background: var(--color-surface-elevated);
  box-shadow: 0 0 8px var(--color-accent-soft);
  transform: rotate(15deg);
}

.nav-theme-toggle--light {
  color: var(--color-text-tertiary);
  border-color: rgba(15, 23, 42, 0.15);
}

.nav-theme-toggle--light:hover {
  color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
  box-shadow: 2px 2px 0 var(--color-accent-soft), 0 0 8px var(--color-accent-softer);
}
</style>
