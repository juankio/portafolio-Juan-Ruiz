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
  <nav class="nav-links hidden flex-1 items-center justify-center gap-1.5 lg:flex">
    <UButton
      v-for="item in links"
      :key="item.href"
      :to="item.href"
      variant="ghost"
      color="neutral"
      size="sm"
      class="nav-link"
      :class="[
        isLight
          ? 'text-slate-700 hover:text-slate-900 hover:bg-emerald-100/70'
          : 'text-slate-300 hover:text-white hover:bg-white/8',
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
.nav-links {
  font-family: 'Segoe UI', 'Inter', 'Roboto', system-ui, sans-serif;
}

.nav-link {
  position: relative;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.2s ease;
}

.nav-link--active-light {
  border-color: rgba(16, 185, 129, 0.55);
  background: rgba(16, 185, 129, 0.14);
  color: #065f46;
}

.nav-link--active-dark {
  border-color: rgba(248, 113, 113, 0.55);
  background: rgba(239, 68, 68, 0.16);
  color: #f8fafc;
}

.nav-link--active-light::after,
.nav-link--active-dark::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 4px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.6;
}
</style>
