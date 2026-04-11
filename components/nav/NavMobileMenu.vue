<script setup>
import NavActions from './NavActions.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})
const isLight = computed(() => props.isLight)

const emit = defineEmits(['toggle-mode'])

const { t } = useI18n()
const route = useRoute()

const links = computed(() => [
  { label: t('nav.links.home'), href: '/' },
  { label: t('nav.links.about'), href: '/sobre-mi' },
  { label: t('nav.links.projects'), href: '/proyectos' },
  { label: t('nav.links.contact'), href: '/contacto' }
])

const isActive = (href) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

const slideoverUi = computed(() => (
  isLight.value
    ? {
        overlay: 'bg-slate-900/45',
        content: 'bg-slate-100 text-slate-900'
      }
    : {
        overlay: 'bg-slate-900/75',
        content: 'bg-[#0f172a] text-slate-100'
      }
))

const socialLinks = [
  { icon: 'i-ph-github-logo-fill', href: 'https://github.com/juankio', label: 'GitHub' },
  { icon: 'i-ph-linkedin-logo-fill', href: 'https://linkedin.com/in/juankio', label: 'LinkedIn' }
]
</script>

<template>
  <USlideover :close="false" :ui="slideoverUi">
    <template #default>
      <slot name="trigger" />
    </template>

    <template #body="{ close }">
      <div class="mobile-sheet flex h-full flex-col gap-6 px-5 py-6">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-[0.14em]" :class="isLight ? 'text-slate-700' : 'text-slate-300'">
            Menu
          </span>
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            size="sm"
            class="rounded-lg"
            :class="isLight ? 'text-slate-700 hover:bg-emerald-100' : 'text-slate-100 hover:bg-red-500/15'"
            aria-label="Close menu"
            @click="close"
          />
        </div>

        <div class="flex flex-col gap-2">
          <UButton
            v-for="item in links"
            :key="item.href"
            :to="item.href"
            variant="ghost"
            size="lg"
            class="mobile-nav w-full justify-start"
            :class="[
              isLight
                ? 'text-slate-700 hover:bg-emerald-100/70'
                : 'text-slate-100 hover:bg-red-500/12',
              isActive(item.href)
                ? isLight
                  ? 'mobile-nav--active-light'
                  : 'mobile-nav--active-dark'
                : ''
            ]"
            @click="close"
          >
            {{ item.label }}
          </UButton>
        </div>

        <div class="h-px" :class="isLight ? 'bg-emerald-300/80' : 'bg-red-400/40'" />

        <NavActions :is-light="isLight" stacked @toggle-mode="emit('toggle-mode')" />

        <div class="mt-auto flex items-center gap-2.5">
          <UButton
            v-for="social in socialLinks"
            :key="social.label"
            :icon="social.icon"
            :to="social.href"
            target="_blank"
            variant="ghost"
            size="sm"
            class="rounded-lg"
            :class="isLight ? 'text-slate-700 hover:bg-emerald-100' : 'text-slate-300 hover:bg-red-500/15'"
            :aria-label="social.label"
          />
        </div>
      </div>
    </template>
  </USlideover>
</template>

<style scoped>
.mobile-sheet {
  font-family: 'Segoe UI', 'Inter', 'Roboto', system-ui, sans-serif;
}

.mobile-nav {
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.mobile-nav--active-light {
  border-color: rgba(16, 185, 129, 0.55);
  background: rgba(16, 185, 129, 0.16);
  color: #065f46;
}

.mobile-nav--active-dark {
  border-color: rgba(248, 113, 113, 0.55);
  background: rgba(239, 68, 68, 0.16);
  color: #fff;
}
</style>
