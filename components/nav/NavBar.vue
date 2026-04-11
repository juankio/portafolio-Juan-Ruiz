<script setup>
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
    class="nav-root sticky top-0 z-50 border-b transition-all duration-300"
    :class="[
      isLight
        ? scrolled
          ? 'bg-slate-100/95 border-emerald-500/25 shadow-[0_12px_32px_-20px_rgba(15,23,42,0.35)]'
          : 'bg-slate-100/80 border-emerald-400/20'
        : scrolled
          ? 'bg-[#0b1220]/95 border-red-500/30 shadow-[0_14px_38px_-20px_rgba(0,0,0,0.7)]'
          : 'bg-[#0b1220]/82 border-red-400/25'
    ]"
  >
    <UContainer class="flex h-[74px] items-center gap-3 sm:gap-4">
      <NavBrand :is-light="isLight" />
      <NavLinks :is-light="isLight" />
      <NavActions class="hidden lg:flex" :is-light="isLight" @toggle-mode="emit('toggle-mode')" />

      <div class="ml-auto flex lg:hidden">
        <NavMobileMenu :is-light="isLight" @toggle-mode="emit('toggle-mode')">
          <template #trigger>
            <UButton
              icon="i-heroicons-bars-3-bottom-right-20-solid"
              size="sm"
              variant="soft"
              class="rounded-xl"
              :class="isLight
                ? 'text-slate-800 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300/70'
                : 'text-slate-100 bg-red-500/12 hover:bg-red-500/20 border border-red-400/60'"
              aria-label="Open menu"
            />
          </template>
        </NavMobileMenu>
      </div>
    </UContainer>
  </header>
</template>

<style scoped>
.nav-root {
  font-family: 'Segoe UI', 'Inter', 'Roboto', system-ui, sans-serif;
  letter-spacing: normal;
}
</style>
