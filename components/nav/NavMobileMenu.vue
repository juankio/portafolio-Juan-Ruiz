<script setup>
import { inject, ref, watch, nextTick } from 'vue'
import { animate, stagger } from 'animejs'
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import NavMobileMenuLinks from './NavMobileMenuLinks.vue'
import NavMobileMenuSocial from './NavMobileMenuSocial.vue'

const isLight = inject('isLight', ref(false))
const emit = defineEmits(['toggle-mode'])

const { t, locale, setLocale } = useI18n()
const open = ref(false)

const localeItems = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' }
]

// Santoryu: Gestor de transición con animejs
watch(open, async (isOpen) => {
  if (isOpen) {
    await nextTick()
    
    // Mover foco al primer enlace para evitar warning de aria-hidden en el header
    const firstLink = document.querySelector('.mobile-drawer-content .mobile-link')
    if (firstLink) {
      firstLink.focus()
    }

    // Animación fluida sin setTimeout para que no se vea la pantalla en blanco
    animate('.mobile-stagger-item', {
      translateX: [-20, 0], // Distancia más corta
      opacity: [0, 1],
      delay: stagger(40, { start: 50 }), // Inicia casi de inmediato, stagger más rápido
      duration: 500, // Un poco más rápido para emparejar con el Drawer
      easing: 'easeOutQuart' // Easing más ligero que Elastic para evitar lag en móviles
    })
  } else {
    // Resetear al cerrar
    document.querySelectorAll('.mobile-stagger-item').forEach(el => {
      el.style.opacity = '0'
      el.style.transform = 'translateX(-20px)'
    })
  }
})
</script>

<template>
  <UDrawer
    v-model:open="open"
    title="Menú principal"
    description="Navegación del sitio"
    :ui="{
      content: 'mobile-drawer-content',
      handle: 'mobile-drawer-handle',
      overlay: 'bg-black/40'
    }"
  >
    <slot name="trigger" />

    <template #content>
      <div class="relative px-6 pb-8 pt-2 overflow-hidden w-full h-full">
          <!-- Spray decorations -->
          <SpraySplatter class="absolute -top-4 -right-6 pointer-events-none" size="md" :opacity="0.06" />
          <SpraySplatter class="absolute bottom-6 -left-4 pointer-events-none" size="sm" :opacity="0.04" color="var(--spray-cyan)" />
          <PaintDrip class="absolute top-0 right-16 pointer-events-none" :count="2" :animated="true" />

          <!-- Header -->
          <div class="relative z-10 flex items-center justify-between mb-6 mobile-stagger-item opacity-0">
            <span class="tag-sticker text-xs uppercase tracking-widest">
              Menu
            </span>

            <!-- Crown deco -->
            <svg class="w-8 h-6 opacity-[0.12] text-[var(--color-accent)]" viewBox="0 0 100 70" fill="currentColor" aria-hidden="true">
              <path d="M10 60 L10 25 L30 40 L50 10 L70 40 L90 25 L90 60 Z" />
              <circle cx="10" cy="20" r="4" /><circle cx="50" cy="5" r="4" /><circle cx="90" cy="20" r="4" />
            </svg>
          </div>

          <!-- Links -->
          <NavMobileMenuLinks @close="open = false" />

          <!-- Spray divider -->
          <div class="mobile-divider mb-5 mobile-stagger-item opacity-0" aria-hidden="true" />

          <!-- Unified Footer: Settings & Socials -->
          <div class="relative z-10 flex flex-wrap items-center justify-between gap-4">
            
            <!-- Left: Settings -->
            <div class="flex items-center gap-3 mobile-stagger-item opacity-0">
              <!-- Theme toggle -->
              <button
                class="mobile-control-btn flex items-center justify-center w-10 h-10"
                :class="isLight ? 'mobile-control-btn--light' : ''"
                :aria-label="t('nav.themeToggle')"
                @click="emit('toggle-mode')"
              >
                <UIcon
                  :name="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
                  class="h-5 w-5 transition-transform duration-200"
                />
              </button>

              <!-- Language switch -->
              <div
                class="mobile-lang-switch flex items-center p-1"
                role="group"
                aria-label="Language switch"
              >
                <button
                  v-for="item in localeItems"
                  :key="item.code"
                  class="mobile-lang-btn font-marker text-sm tracking-wide"
                  :class="[
                    locale === item.code ? 'mobile-lang-btn--active' : 'mobile-lang-btn--inactive',
                    isLight && locale !== item.code ? 'mobile-lang-btn--inactive-light' : ''
                  ]"
                  :aria-pressed="locale === item.code"
                  @click="setLocale(item.code)"
                >
                  {{ item.label }}
                </button>
              </div>
            </div>

            <!-- Right: Socials -->
            <NavMobileMenuSocial />

          </div>

          <!-- Bottom mark -->
          <div class="absolute bottom-2 right-4 font-marker text-[0.45rem] tracking-widest opacity-10 text-[var(--color-accent)] mobile-stagger-item opacity-0" aria-hidden="true">
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

/* Theme toggle relies on this class */
.mobile-control-btn {
  color: var(--color-text-secondary);
  border: 2px solid var(--color-border-accent);
  border-radius: 4px 8px 3px 6px;
  background: var(--color-surface-card);
  transition: all 0.2s var(--ease-spring);
}

.mobile-control-btn:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-soft);
  transform: rotate(3deg) scale(1.05);
}

.mobile-control-btn--light {
  color: var(--color-text-tertiary);
  border-color: rgba(15, 23, 42, 0.15);
}

.mobile-control-btn--light:hover {
  color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
}

/* Language Switch */
.mobile-lang-switch {
  border: 2px solid var(--color-border-accent);
  border-radius: 3px 8px 4px 6px;
  background: var(--color-surface-card);
}

.mobile-lang-btn {
  min-width: 36px;
  padding: 4px 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s var(--ease-spring);
  border-radius: 2px 6px 3px 4px;
}

.mobile-lang-btn--active {
  background: var(--color-accent);
  color: white;
  box-shadow: 1px 1px 0 rgba(0,0,0,0.25);
}

.mobile-lang-btn--inactive {
  background: transparent;
  color: var(--color-text-secondary);
}

.mobile-lang-btn--inactive:hover {
  color: var(--color-accent);
}

.mobile-lang-btn--inactive-light {
  color: var(--color-text-tertiary);
}

.mobile-lang-btn--inactive-light:hover {
  color: var(--color-accent-dark);
}
</style>