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
  <nav class="hidden flex-1 items-center justify-center gap-1 lg:flex">
    <UButton
      v-for="item in links"
      :key="item.href"
      :to="item.href"
      variant="ghost"
      color="neutral"
      size="md"
      class="nav-link px-4 py-2.5 text-sm font-bold uppercase tracking-[0.08em]"
      :class="[
        isLight
          ? 'text-slate-600 hover:text-[var(--color-accent-dark)] hover:bg-slate-100'
          : 'text-slate-400 hover:text-[var(--color-accent)] hover:bg-white/5',
        isActive(item.href) ? (isLight ? 'nav-link--active-light' : 'nav-link--active') : ''
      ]"
    >
      {{ item.label }}
    </UButton>
  </nav>
</template>

<style scoped>
.nav-link {
  position: relative;
  border-radius: 3px 8px 4px 6px;
  transition: all 0.2s var(--ease-spring);
}

/* Spray underline on hover */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 25%;
  right: 25%;
  height: 2px;
  background: var(--color-accent);
  border-radius: 1px;
  transform: scaleX(0);
  transition: transform 0.25s var(--ease-spring);
}

.nav-link:hover::after {
  transform: scaleX(1);
  filter: drop-shadow(0 0 3px var(--color-accent));
}

/* Active state — tag sticker feel */
.nav-link--active {
  background: var(--color-accent-soft) !important;
  color: var(--color-accent) !important;
  border-radius: 3px 8px 4px 6px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.15);
}

.nav-link--active-light {
  background: var(--color-accent-soft) !important;
  color: var(--color-accent-dark) !important;
  border-radius: 3px 8px 4px 6px;
  box-shadow: 2px 2px 0 rgba(0,0,0,0.08);
}

.nav-link--active::after,
.nav-link--active-light::after {
  transform: scaleX(1);
  opacity: 0.8;
  filter: drop-shadow(0 0 4px var(--color-accent));
}
</style>
