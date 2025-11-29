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
    base: '!bg-white !text-slate-800 !border !border-emerald-300 hover:!bg-emerald-50 hover:!border-emerald-400'
  },
  content: {
    base: '!bg-white !text-slate-800 !border !border-emerald-300 shadow-lg shadow-emerald-200/50'
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
    class="sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300"
    :class="
      scrolled
        ? isLight
          ? 'bg-white/92 border-b border-slate-200'
          : 'bg-black/80 border-b border-white/5'
        : isLight
          ? 'bg-white/88'
          : 'bg-gradient-to-r from-black/85 via-black/70 to-black/80'
    "
  >
    <UContainer class="flex items-center gap-3 py-1 md:py-1.5">
      <UButton
        to="/"
        color="neutral"
        variant="ghost"
        class="flex shrink-0 items-center gap-2.5 px-0 text-base font-semibold tracking-tight hover:bg-transparent"
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
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Juan Miguel</p>
          <p class="text-base font-semibold" :class="isLight ? 'text-slate-900' : 'text-slate-100'">Ruiz Supelano</p>
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
          class="font-medium px-3 py-1"
          :class="isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'"
        >
          {{ item.label }}
        </UButton>
      </nav>

      <div class="flex flex-1 items-center justify-end gap-2.5">
        <div :class="isLight ? '' : 'dark-locale'">
          <ULocaleSelect
            v-model="localeModel"
            :locales="availableLocales"
            size="sm"
            variant="outline"
            value-key="code"
          label-key="name"
          :color="isLight ? 'success' : 'error'"
          :ui="isLight ? lightLocaleUi : darkLocaleUi"
            :content="!isLight ? { class: 'dark-locale-content', style: 'background:#000!important;color:#fff!important;border:1px solid #ef4444!important;' } : undefined"
            class="w-40 sm:w-44"
            :class="isLight ? '!border-emerald-400 !bg-white !text-slate-800' : '!border-red-500 !bg-black !text-white !opacity-100'"
          >
            <template #value="{ option }">
              <span :class="isLight ? 'text-slate-800' : 'text-white !opacity-100'">{{ option?.name || localeModel }}</span>
            </template>
            <template #item="{ item }">
              <span :class="isLight ? 'text-slate-800' : 'text-white !opacity-100'">{{ item.name }}</span>
            </template>
          </ULocaleSelect>
        </div>
        <UButton
          to="/proyectos"
          size="sm"
          variant="soft"
          :class="
            isLight
              ? 'border border-emerald-300 text-emerald-700 bg-emerald-50/80 hover:bg-emerald-100/80'
              : 'border border-red-500/60 text-red-100 bg-red-500/10 hover:bg-red-500/20'
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
              : 'border border-red-500/60 text-red-100 hover:border-red-400 hover:bg-red-500/20'
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
              : 'border border-red-500/80 text-white hover:border-red-400 hover:bg-red-500/10'
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
</style>
