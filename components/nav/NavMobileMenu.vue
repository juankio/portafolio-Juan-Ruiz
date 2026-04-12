<script setup>
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import NavActions from './NavActions.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})
const isLight = computed(() => props.isLight)

const emit = defineEmits(['toggle-mode'])

const { t } = useI18n()
const route = useRoute()

const open = ref(false)

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

const socialLinks = [
  { icon: 'i-ph-github-logo-fill', href: 'https://github.com/juankio', label: 'GitHub' },
  { icon: 'i-ph-linkedin-logo-fill', href: 'https://linkedin.com/in/juankio', label: 'LinkedIn' }
]
</script>

<template>
  <UDrawer
    v-model:open="open"
    :ui="{
      content: 'mobile-drawer-content',
      handle: 'mobile-drawer-handle',
      overlay: 'bg-black/40'
    }"
  >
    <slot name="trigger" />

    <template #content>
        <div class="relative px-6 pb-8 pt-2 overflow-hidden">
          <!-- Spray decorations -->
          <SpraySplatter class="absolute -top-4 -right-6 pointer-events-none" size="md" :opacity="0.06" />
          <SpraySplatter class="absolute bottom-6 -left-4 pointer-events-none" size="sm" :opacity="0.04" color="var(--spray-cyan)" />
          <PaintDrip class="absolute top-0 right-16 pointer-events-none" :count="2" :animated="true" />

          <!-- Header -->
          <div class="relative z-10 flex items-center justify-between mb-6">
            <span class="tag-sticker text-xs uppercase tracking-widest">
              Menu
            </span>

            <!-- Crown deco -->
            <svg class="w-8 h-6 opacity-[0.12] text-[var(--color-accent)]" viewBox="0 0 100 70" fill="currentColor" aria-hidden="true">
              <path d="M10 60 L10 25 L30 40 L50 10 L70 40 L90 25 L90 60 Z" />
              <circle cx="10" cy="20" r="4" /><circle cx="50" cy="5" r="4" /><circle cx="90" cy="20" r="4" />
            </svg>
          </div>

          <!-- Links — numbered graffiti style -->
          <div class="relative z-10 flex flex-col gap-2 mb-6">
            <NuxtLink
              v-for="item in links"
              :key="item.href"
              :to="item.href"
              class="mobile-link group flex items-center gap-3 px-4 py-3"
              :class="isActive(item.href) ? 'mobile-link--active' : ''"
              @click="open = false"
            >
              <span class="mobile-link__num font-marker">{{ item.num }}</span>
              <span class="text-sm font-bold uppercase tracking-[0.06em]">{{ item.label }}</span>
            </NuxtLink>
          </div>

          <!-- Spray divider -->
          <div class="mobile-divider mb-6" aria-hidden="true" />

          <!-- Actions -->
          <div class="relative z-10 mb-6">
            <NavActions :is-light="isLight" stacked @toggle-mode="emit('toggle-mode')" />
          </div>

          <!-- Social links -->
          <div class="relative z-10 flex items-center gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="mobile-social flex items-center justify-center w-10 h-10"
              :aria-label="social.label"
            >
              <UIcon :name="social.icon" class="h-5 w-5" />
            </a>
          </div>

          <!-- Bottom mark -->
          <div class="absolute bottom-2 right-4 font-marker text-[0.45rem] tracking-widest opacity-10 text-[var(--color-accent)]" aria-hidden="true">
            NAVIGATE ★
          </div>
        </div>
    </template>
  </UDrawer>
</template>

<style scoped>
:deep(.mobile-drawer-content) {
  background: var(--color-wall) !important;
  border-top: 2px solid var(--color-border-accent) !important;
  border-radius: 12px 12px 0 0 !important;
}

:deep(.mobile-drawer-handle) {
  background: var(--color-accent) !important;
  opacity: 0.5;
}

.mobile-link {
  border-radius: 3px 8px 4px 6px;
  color: var(--color-text-secondary);
  transition: all 0.2s var(--ease-spring);
  border: 2px solid transparent;
}

.mobile-link:hover {
  color: var(--color-accent);
  background: var(--color-accent-softer);
  border-color: var(--color-border-accent);
}

.mobile-link--active {
  background: var(--color-accent-soft);
  color: var(--color-accent);
  border-color: var(--color-border-accent);
  box-shadow: 2px 3px 0 rgba(0,0,0,0.15);
}

.mobile-link__num {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-accent);
  opacity: 0.3;
  min-width: 1.5rem;
}

.mobile-link--active .mobile-link__num {
  opacity: 0.7;
}

.mobile-divider {
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-accent) 0px,
    var(--color-accent) 8px,
    transparent 8px,
    transparent 14px
  );
  opacity: 0.25;
  border-radius: 1px;
}

.mobile-social {
  color: var(--color-text-secondary);
  border: 2px solid var(--color-border-accent);
  border-radius: 3px 6px 4px 8px;
  transition: all 0.2s var(--ease-spring);
}

.mobile-social:hover {
  color: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-soft);
  transform: scale(1.1);
}
</style>
