<script setup>
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import NavBrand from './NavBrand.vue'
import NavLinks from './NavLinks.vue'
import NavActions from './NavActions.vue'
import NavMobileMenu from './NavMobileMenu.vue'

defineProps({
  isLight: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-mode'])
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 8
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
    class="navbar-wall sticky top-0 z-50 transition-all duration-300"
    :class="scrolled ? 'navbar-wall--scrolled' : ''"
  >
    <!-- Spray paint bottom line -->
    <div class="absolute bottom-0 left-0 right-0 h-[2px] navbar-spray-line" aria-hidden="true" />

    <!-- Subtle spray deco -->
    <SpraySplatter class="absolute -bottom-3 right-16 pointer-events-none" size="sm" :opacity="0.04" />

    <div class="relative z-10 flex h-18 items-center gap-3 px-4 sm:gap-4 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
      <NavBrand :is-light="isLight" />
      <NavLinks :is-light="isLight" />
      <NavActions class="hidden lg:flex" :is-light="isLight" @toggle-mode="emit('toggle-mode')" />

      <div class="ml-auto flex lg:hidden">
        <NavMobileMenu :is-light="isLight" @toggle-mode="emit('toggle-mode')">
          <template #trigger>
            <button
              class="flex items-center justify-center rounded-lg p-2 text-slate-400 hover:text-[var(--color-accent)] transition-colors active:bg-white/5"
              aria-label="Open menu"
            >
              <UIcon name="i-heroicons-bars-3-bottom-right-20-solid" class="h-6 w-6" />
            </button>
          </template>
        </NavMobileMenu>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar-wall {
  background: var(--color-surface-card);
  backdrop-filter: blur(16px);
  border-bottom: 2px solid var(--color-border-accent);
}

.navbar-wall--scrolled {
  box-shadow: var(--shadow-glow);
}

.navbar-spray-line {
  background: repeating-linear-gradient(
    90deg,
    var(--color-accent) 0px,
    var(--color-accent) 12px,
    transparent 12px,
    transparent 18px,
    var(--color-accent) 18px,
    var(--color-accent) 24px,
    transparent 24px,
    transparent 30px
  );
  opacity: 0.35;
}

.navbar-wall--scrolled .navbar-spray-line {
  opacity: 0.6;
  filter: drop-shadow(0 0 4px var(--color-accent));
}
</style>
