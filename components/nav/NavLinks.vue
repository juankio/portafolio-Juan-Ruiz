<script setup>
defineProps({
  isLight: { type: Boolean, default: false }
})

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
</script>

<template>
  <nav class="hidden flex-1 items-center justify-center gap-2 lg:flex">
    <UButton
      v-for="item in links"
      :key="item.href"
      :to="item.href"
      variant="ghost"
      color="neutral"
      size="md"
      class="nav-link rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em]"
      :class="[
        isLight
          ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          : 'text-slate-400 hover:text-white hover:bg-slate-800',
        isActive(item.href)
          ? isLight
            ? 'nav-link--active-light'
            : 'nav-link--active-dark'
          : ''
      ]"
    >
      {{ item.label }}
    </UButton>
  </nav>
</template>

<style scoped>
.nav-link {
  position: relative;
  transition: all 0.15s ease;
}

.nav-link--active-light {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}

.nav-link--active-dark {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
}
</style>
