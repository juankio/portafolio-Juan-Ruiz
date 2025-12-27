<script setup>
const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const { t } = useI18n()

const links = computed(() => [
  { label: t('nav.links.home'), href: '/' },
  { label: t('nav.links.about'), href: '/sobre-mi' },
  { label: t('nav.links.projects'), href: '/proyectos' },
  { label: t('nav.links.contact'), href: '/contacto' }
])
</script>

<template>
  <nav class="hidden flex-1 items-center justify-center gap-2 md:flex">
    <UButton
      v-for="item in links"
      :key="item.href"
      :to="item.href"
      variant="ghost"
      color="neutral"
      size="md"
      class="nav-pill"
      :class="isLight ? 'text-slate-700 hover:bg-gray-300/90 hover:border-emerald-200 hover:text-emerald-700' : 'text-slate-200 hover:bg-gray-300/5 hover:border-red-400/60 hover:text-slate-50'"
      :style="{
        '--nav-fill': isLight
          ? 'linear-gradient(90deg,#10b981,#059669)'
          : 'linear-gradient(90deg,#ef4444,#b91c1c)'
      }"
    >
      <span class="nav-fill" :data-text="item.label">{{ item.label }}</span>
    </UButton>
  </nav>
</template>

<style scoped>
.nav-pill {
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  border-radius: 9999px;
  padding-inline: 16px;
  padding-block: 10px;
  text-transform: uppercase;
  transition: all 200ms ease;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  font-size: 0.95rem;
  font-weight: 700;
  font-family: "Bangers", "Druk Text Wide Trial", "Druk Wide Trial", Inter, system-ui, sans-serif;
  position: relative;
  overflow: hidden;
}
.nav-pill:hover {
  box-shadow: 0 10px 22px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
}
.nav-fill {
  position: relative;
  display: inline-block;
}
.nav-fill::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  background: var(--nav-fill);
  background-repeat: no-repeat;
  background-size: 0% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: background-size 0.35s ease;
}
.nav-pill:hover .nav-fill::after {
  background-size: 100% 100%;
}
</style>
