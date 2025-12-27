<script setup>
import { es, en } from '@nuxt/ui/locale'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-mode'])

const { locale, setLocale, t } = useI18n()
const availableLocales = [es, en]

const localeModel = computed({
  get: () => locale.value,
  set: (code) => {
    const match = availableLocales.find(item => item.code === code)
    setLocale(match ? match.code : 'en')
  }
})

const lightLocaleUi = {
  base: 'text-slate-800',
  trigger: {
    base: '!bg-gray-200 !text-slate-800 !border !border-emerald-300 hover:!bg-emerald-50 hover:!border-emerald-400'
  },
  content: {
    base: '!bg-gray-200 !text-slate-800 !border !border-emerald-300 shadow-lg shadow-emerald-200/50'
  },
  item: {
    base: 'text-slate-800 data-[state=checked]:bg-emerald-50',
    label: 'text-slate-800',
    leading: 'text-lg text-slate-800'
  }
}

const darkLocaleUi = {
  base: '!text-white',
  trigger: {
    base: '!bg-[#0f1621] !text-slate-200 !border !border-red-500 hover:!bg-red-500/10'
  },
  content: {
    base: '!bg-[#0f1621] !text-slate-200 !border !border-red-500 !shadow-lg !shadow-red-500/25'
  },
  item: {
    base: '!text-slate-200 data-[state=checked]:bg-red-500/15',
    label: '!text-slate-200',
    leading: 'text-lg !text-slate-200'
  }
}
</script>

<template>
  <div class="flex flex-1 items-center justify-end gap-3">
    <div :class="isLight ? 'light-locale' : 'dark-locale'">
      <ULocaleSelect
        v-model="localeModel"
        :locales="availableLocales"
        size="sm"
        variant="outline"
        value-key="code"
        label-key="name"
        :color="isLight ? 'success' : 'error'"
        :ui="isLight ? lightLocaleUi : darkLocaleUi"
        :content="
          isLight
            ? { class: 'light-locale-content', style: 'background:#e5e7eb!important;color:#0f172a!important;border:1px solid #10b981!important;' }
            : { class: 'dark-locale-content', style: 'background:#0f1621!important;color:#e2e8f0!important;border:1px solid #ef4444!important;' }
        "
        class="w-48 sm:w-52 locale-trigger"
        :class="isLight ? '!border-emerald-400 !bg-gray-200 !text-slate-800' : '!border-red-500 !bg-[#111827] !text-slate-100 !opacity-100'"
      >
        <template #value="{ option }">
          <span :class="isLight ? 'text-slate-800' : 'text-slate-100 !opacity-100'">{{ option?.name || localeModel }}</span>
        </template>
        <template #item="{ item }">
          <span :class="isLight ? 'text-slate-800' : 'text-slate-100 !opacity-100'">{{ item.name }}</span>
        </template>
      </ULocaleSelect>
    </div>

    <UButton
      to="/proyectos"
      size="sm"
      variant="soft"
      class="nav-cta"
      :class="isLight
        ? 'border border-emerald-300/80 text-slate-700 bg-gradient-to-r from-emerald-300/90 via-emerald-400/85 to-lime-200/80 hover:brightness-110'
        : 'border border-red-400/70 text-slate-100 bg-gradient-to-r from-red-600/90 via-red-500/85 to-amber-300/75 hover:brightness-110'"
    >
      {{ t('nav.ctaProjects') }}
    </UButton>

    <UButton
      size="sm"
      variant="outline"
      :icon="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
      class="rounded-full toggle-btn"
      :color="isLight ? 'success' : 'error'"
      :aria-label="t('nav.themeToggle')"
      @click="emit('toggle-mode')"
    />
  </div>
</template>

<style scoped>
.locale-trigger [data-slot='base'] {
  background: transparent !important;
}
.dark-locale-content {
  background: #0f1621 !important;
  color: #e2e8f0 !important;
  border: 1px solid #ef4444 !important;
  box-shadow: 0 18px 38px -12px rgba(239, 68, 68, 0.35) !important;
}
.dark-locale-content .ui-select-menu-item,
.dark-locale-content [data-slot='item'] {
  color: #e2e8f0 !important;
}
.dark-locale-content [data-slot='content'],
.dark-locale-content [data-slot='viewport'],
.dark-locale-content [data-slot='group'] {
  background: #0f1621 !important;
  color: #e2e8f0 !important;
}
.dark-locale [data-slot='base'] {
  background: #0f1621 !important;
  color: #e2e8f0 !important;
  border: 1px solid #ef4444 !important;
  outline: none !important;
  box-shadow: 0 0 0 1px #ef4444 !important;
}
.dark-locale [data-slot='content'] {
  background: #0f1621 !important;
  color: #e2e8f0 !important;
  border: 1px solid #ef4444 !important;
  box-shadow: 0 18px 38px -12px rgba(239, 68, 68, 0.35) !important;
}
.dark-locale [data-slot='item'] span {
  color: #e2e8f0 !important;
}
.dark-locale [data-slot='item'] {
  color: #e2e8f0 !important;
}
.light-locale [data-slot='base'] {
  background: #e5e7eb !important;
  color: #0f172a !important;
  border: 1px solid #10b981 !important;
  outline: none !important;
  box-shadow: 0 0 0 1px #10b981 !important;
}
.light-locale [data-slot='content'] {
  background: #e5e7eb !important;
  color: #0f172a !important;
  border: 1px solid #10b981 !important;
  box-shadow: 0 18px 38px -12px rgba(16, 185, 129, 0.35) !important;
}
.light-locale [data-slot='item'],
.light-locale [data-slot='item-label'] {
  color: #0f172a !important;
}
.light-locale-content {
  background: #e5e7eb !important;
  color: #0f172a !important;
  border: 1px solid #10b981 !important;
  box-shadow: 0 18px 38px -12px rgba(16, 185, 129, 0.35) !important;
}
.light-locale-content [data-slot='item'],
.light-locale-content [data-slot='item-label'] {
  color: #0f172a !important;
}
.nav-cta {
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 800;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  font-family: "Bangers", "Druk Text Wide Trial", "Druk Wide Trial", Inter, system-ui, sans-serif;
}
.toggle-btn {
  position: relative;
  overflow: hidden;
}
.toggle-btn::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: 9999px;
  border: 1px solid;
  border-color: inherit;
  opacity: 0.4;
  pointer-events: none;
}
.toggle-light {
  border: 2px solid #10b981 !important;
  color: #0f172a !important;
  background: transparent !important;
}
.toggle-dark {
  border: 2px solid #ef4444 !important;
  color: #e2e8f0 !important;
  background: transparent !important;
}
.toggle-light:hover {
  border-color: #34d399 !important;
  background-color: rgba(16, 185, 129, 0.08) !important;
}
.toggle-dark:hover {
  border-color: #fca5a5 !important;
  background-color: rgba(248, 113, 113, 0.15) !important;
}
</style>
