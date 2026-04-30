<script setup>
import NavBar from '~/components/nav/NavBar.vue'
import FooterBar from '~/components/footer/FooterBar.vue'
import SkipToContent from '~/components/ui/SkipToContent.vue'

const { isLight, toggleMode } = useThemeMode()

provide('isLight', isLight)
provide('toggleMode', toggleMode)
</script>

<template>
  <div
    class="min-h-screen bg-brick transition-colors duration-300"
    :class="isLight ? 'text-slate-800' : 'text-slate-200'"
  >
    <SkipToContent />
    
    <NavBar :is-light="isLight" @toggle-mode="toggleMode" />
    
    <UPage id="main-content" class="relative min-h-screen z-10" tabindex="-1">
      <div class="absolute inset-0 bg-concrete pointer-events-none" />
      <UPageBody class="relative z-10 !mt-0 !space-y-0 !pb-0">
        <slot />
      </UPageBody>
    </UPage>

    <FooterBar :is-light="isLight" />
  </div>
</template>
