<script setup>
const emit = defineEmits(['close'])

const { t } = useI18n()
const route = useRoute()

const links = computed(() => [
  { label: t('nav.links.home'), href: '/', num: '01' },
  { label: t('nav.links.about'), href: '/sobre-mi', num: '02' },
  { label: t('nav.links.projects'), href: '/proyectos', num: '03' },
  { label: t('nav.links.contact'), href: '/contacto', num: '04' }
])

const isActive = (href) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}
</script>

<template>
  <div class="relative z-10 flex flex-col gap-2 mb-6">
    <NuxtLink
      v-for="item in links"
      :key="item.href"
      :to="item.href"
      class="mobile-link group flex items-center gap-3 px-4 py-3.5 mobile-stagger-item opacity-0"
      :class="isActive(item.href) ? 'mobile-link--active' : ''"
      @click="emit('close')"
    >
      <span class="mobile-link__num font-marker">{{ item.num }}</span>
      <span class="text-sm font-bold uppercase tracking-[0.08em]">{{ item.label }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.mobile-link {
  border-radius: 3px 8px 4px 6px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-spring);
  border: 1px solid transparent;
}

.mobile-link:hover {
  color: var(--color-accent);
  background: var(--color-accent-softer);
  border-color: rgba(var(--color-accent-rgb), 0.2);
}

.mobile-link--active {
  background: var(--color-accent-softer);
  color: var(--color-accent);
  border-color: rgba(var(--color-accent-rgb), 0.3);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.06);
}

.mobile-link__num {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-accent);
  opacity: 0.4;
  min-width: 1.5rem;
}

.mobile-link--active .mobile-link__num {
  opacity: 0.8;
}
</style>