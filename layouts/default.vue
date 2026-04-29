<script setup>
import NavBar from '~/components/nav/NavBar.vue'
import FooterBar from '~/components/footer/FooterBar.vue'

const { isLight, toggleMode } = useThemeMode()

provide('isLight', isLight)
provide('toggleMode', toggleMode)
</script>

<template>
  <div
    class="min-h-screen bg-brick transition-colors duration-300"
    :class="isLight ? 'text-slate-800' : 'text-slate-200'"
  >
    <NavBar :is-light="isLight" @toggle-mode="toggleMode" />
    
    <main class="relative z-10">
      <UPage class="relative min-h-screen">
        <div class="absolute inset-0 bg-concrete pointer-events-none" />
        <UPageBody class="relative z-10 !mt-0 !space-y-0 !pb-0">
          <slot />
        </UPageBody>
      </UPage>
    </main>

    <FooterBar :is-light="isLight" />
  </div>
</template>
