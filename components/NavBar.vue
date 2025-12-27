<script setup>
import { es, en } from '@nuxt/ui/locale'
import { useI18n } from '~/composables/useI18n'

const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
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

const links = computed(() => [
  { label: t('nav.links.home'), href: '/' },
  { label: t('nav.links.about'), href: '/sobre-mi' },
  { label: t('nav.links.projects'), href: '/proyectos' },
  { label: t('nav.links.contact'), href: '/contacto' }
])

const lightLocaleUi = {
  base: 'text-slate-800',
  trigger: {
    base: '!bg-gray-300 !text-slate-800 !border !border-emerald-300 hover:!bg-emerald-50 hover:!border-emerald-400'
  },
  content: {
    base: '!bg-gray-300 !text-slate-800 !border !border-emerald-300 shadow-lg shadow-emerald-200/50'
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
    base: '!bg-black !text-white !border !border-red-500 hover:!bg-red-500/10'
  },
  content: {
    base: '!bg-black !text-white !border !border-red-500 !shadow-lg !shadow-red-500/25'
  },
  item: {
    base: '!text-white data-[state=checked]:bg-red-500/15',
    label: '!text-white',
    leading: 'text-lg !text-white'
  }
}

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-2xl transition-all duration-300 shadow-[0_10px_36px_-18px_rgba(0,0,0,0.65)]"
    :class="
      scrolled
        ? isLight
          ? 'bg-gray-200/95 border-b border-gray-300'
          : 'bg-gray-900/92 border-b border-white/10'
        : isLight
          ? 'bg-gray-200/95 border-b border-gray-300'
          : 'bg-gray-900/90 border-b border-white/10'
    "
  >
    <UContainer class="flex items-center gap-4 py-2 md:py-2.5">
      <UButton
        to="/"
        color="neutral"
        variant="ghost"
        class="nav-brand group flex shrink-0 items-center gap-3 px-0 text-base font-semibold tracking-tight hover:bg-transparent"
      >
        <UBadge
          color="neutral"
          variant="solid"
          :class="
            [
              'flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold uppercase tracking-tight !text-white ring-2 leading-none shadow-lg',
              isLight
                ? 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-300 shadow-[0_12px_28px_rgba(16,185,129,0.45)] ring-emerald-300/70'
                : 'bg-gradient-to-br from-rose-500 via-red-500 to-amber-200 shadow-[0_14px_32px_rgba(248,113,113,0.45)] ring-red-300/70'
            ]
          "
        >
          JM
        </UBadge>
        <div class="leading-tight text-left">
          <p
            class="text-xs uppercase tracking-[0.18em]"
            :class="isLight ? 'text-slate-700' : 'text-slate-300'"
          >
            Juan Miguel
          </p>
          <p
            class="text-lg font-black uppercase tracking-[0.1em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
            :class="isLight ? 'text-slate-800' : 'text-slate-200'"
          >
            Ruiz Supelano
          </p>
        </div>
      </UButton>

      <nav class="hidden flex-1 items-center justify-center gap-1 md:flex">
        <UButton
          v-for="item in links"
          :key="item.href"
          :to="item.href"
          variant="ghost"
          color="neutral"
          size="sm"
          class="nav-pill"
          :class="
            isLight
              ? 'text-slate-700 hover:bg-gray-300/90 hover:border-emerald-200 hover:text-emerald-700'
              : 'text-slate-200 hover:bg-gray-300/5 hover:border-red-400/60 hover:text-slate-50'
          "
        >
          {{ item.label }}
        </UButton>
      </nav>

      <div class="flex flex-1 items-center justify-end gap-2.5">
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
                ? { class: 'light-locale-content', style: 'background:#f9fffb!important;color:#0f172a!important;border:1px solid #10b981!important;' }
                : { class: 'dark-locale-content', style: 'background:#000!important;color:#fff!important;border:1px solid #ef4444!important;' }
            "
          class="w-40 sm:w-44"
          :class="isLight ? '!border-emerald-400 !bg-[#f9fffb] !text-slate-800' : '!border-red-500 !bg-black !text-slate-100 !opacity-100'"
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
        :class="
          isLight
            ? 'border border-emerald-300/80 text-slate-700 bg-gradient-to-r from-emerald-300/90 via-emerald-400/85 to-lime-200/80 hover:brightness-110'
            : 'border border-red-400/70 text-slate-100 bg-gradient-to-r from-red-600/90 via-red-500/85 to-amber-300/75 hover:brightness-110'
        "
      >
        {{ t('nav.ctaProjects') }}
      </UButton>
      <UButton
        size="sm"
        variant="outline"
        :icon="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
        :class="
          isLight
            ? 'border-emerald-300 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50'
            : 'border border-red-500/60 text-slate-100 hover:border-red-400 hover:bg-red-500/20'
        "
        class="rounded-full"
        :aria-label="t('nav.themeToggle')"
        @click="emit('toggle-mode')"
      />
      </div>

      <nav class="flex flex-wrap gap-2 md:hidden">
        <UBadge
          v-for="item in links"
          :key="item.href"
          :to="item.href"
          color="neutral"
          variant="outline"
          :class="
            isLight
              ? 'border-emerald-300 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50'
              : 'border border-red-500/80 text-slate-100 hover:border-red-400 hover:bg-red-500/10'
          " >
          {{ item.label }}
        </UBadge>
      </nav>
    </UContainer>
  </header>
</template>

<style>
.dark-locale-content {
  background: #000 !important;
  color: #fff !important;
  border: 1px solid #ef4444 !important;
  box-shadow: 0 18px 38px -12px rgba(239, 68, 68, 0.35) !important;
}
.dark-locale-content .ui-select-menu-item,
.dark-locale-content [data-slot='item'] {
  color: #fff !important;
}
.dark-locale-content [data-slot='content'],
.dark-locale-content [data-slot='viewport'],
.dark-locale-content [data-slot='group'] {
  background: #000 !important;
  color: #fff !important;
}
.dark-locale [data-slot='base'] {
  background: #000 !important;
  color: #fff !important;
  border: 1px solid #ef4444 !important;
  outline: none !important;
  box-shadow: 0 0 0 1px #ef4444 !important;
}
.dark-locale [data-slot='content'] {
  background: #000 !important;
  color: #fff !important;
  border: 1px solid #ef4444 !important;
  box-shadow: 0 18px 38px -12px rgba(239, 68, 68, 0.35) !important;
}
.dark-locale [data-slot='item'] span {
  color: #fff !important;
}
.dark-locale [data-slot='item'] {
  color: #fff !important;
}
.light-locale [data-slot='base'] {
  background: #f9fffb !important;
  color: #0f172a !important;
  border: 1px solid #10b981 !important;
  outline: none !important;
  box-shadow: 0 0 0 1px #10b981 !important;
}
.light-locale [data-slot='content'] {
  background: #f9fffb !important;
  color: #0f172a !important;
  border: 1px solid #10b981 !important;
  box-shadow: 0 18px 38px -12px rgba(16, 185, 129, 0.35) !important;
}
.light-locale [data-slot='item'],
.light-locale [data-slot='item-label'] {
  color: #0f172a !important;
}
.light-locale-content {
  background: #f9fffb !important;
  color: #0f172a !important;
  border: 1px solid #10b981 !important;
  box-shadow: 0 18px 38px -12px rgba(16, 185, 129, 0.35) !important;
}
.light-locale-content [data-slot='item'],
.light-locale-content [data-slot='item-label'] {
  color: #0f172a !important;
}
.nav-pill {
  letter-spacing: 0.025em;
  border: 1px solid transparent;
  border-radius: 9999px;
  padding-inline: 14px;
  padding-block: 8px;
  text-transform: uppercase;
  transition: all 200ms ease;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
}
.nav-pill:hover {
  box-shadow: 0 10px 22px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
}
.nav-cta {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 800;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
}
</style>
