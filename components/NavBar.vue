<script setup>
import NavBrand from '~/components/nav/NavBrand.vue'
import NavLinks from '~/components/nav/NavLinks.vue'
import NavActions from '~/components/nav/NavActions.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-mode'])
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
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
    class="sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.45)] relative overflow-visible"
    :class="scrolled ? (isLight ? 'bg-gray-300' : 'bg-gray-900/95') : (isLight ? 'bg-gray-300' : 'bg-gray-900/95')"
  >
    <UContainer class="flex items-center gap-4 py-2 md:py-2.5">
      <NavBrand :is-light="isLight" />
      <NavLinks :is-light="isLight" />
      <NavActions :is-light="isLight" @toggle-mode="emit('toggle-mode')" />
    </UContainer>
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[3px]"
      :class="isLight ? 'bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-300' : 'bg-gradient-to-r from-red-500 via-amber-500 to-red-500'"
    />
  </header>
</template>

<style scoped>
header {
  font-family: "Bangers", "Druk Wide Trial", "Druk Text Wide Trial", Inter, system-ui, sans-serif;
}
</style>
