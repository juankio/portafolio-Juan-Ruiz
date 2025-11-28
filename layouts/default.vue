<script setup>
import NavBar from '~/components/NavBar.vue'
import FooterBar from '~/components/FooterBar.vue'

const { isLight, toggleMode } = useThemeMode()
</script>

<template>
  <div
    class="min-h-screen transition-colors"
    :class="isLight ? 'bg-white text-slate-900' : 'bg-[#0c0c0d] text-slate-100'"
  >
    <NavBar :is-light="isLight" @toggle-mode="toggleMode" />
    <slot />
    <FooterBar :is-light="isLight" />
  </div>
</template>
