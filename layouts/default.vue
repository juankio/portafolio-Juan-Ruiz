<script setup>
import NavBar from '~/components/nav/NavBar.vue'
import FooterBar from '~/components/footer/FooterBar.vue'

const { isLight, toggleMode } = useThemeMode()

provide('isLight', isLight)
provide('toggleMode', toggleMode)
</script>

<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :class="isLight ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#0f172a] text-slate-200'"
  >
    <NavBar :is-light="isLight" @toggle-mode="toggleMode" />
    <main class="relative z-10">
      <slot />
    </main>
    <FooterBar :is-light="isLight" />
  </div>
</template>
