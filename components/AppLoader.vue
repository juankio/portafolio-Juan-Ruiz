<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PaintDrip from './graffiti/PaintDrip.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const isLoaded = ref(false)

onMounted(() => {
  // Hide loader after a short delay to ensure hydration is complete and animejs is ready
  setTimeout(() => {
    isLoaded.value = true
  }, 800)
})
</script>

<template>
  <Transition name="splash">
    <div
      v-if="!isLoaded"
      class="fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-colors duration-300 bg-brick"
    >
      <div class="absolute inset-0 bg-concrete pointer-events-none" />
      
      <div class="relative z-10 flex flex-col items-center">
        <!-- Graffiti Loader -->
        <div class="relative mb-6">
          <span class="font-marker text-5xl md:text-7xl text-spray text-white tracking-widest animate-pulse">
            JMRS
          </span>
          <PaintDrip class="absolute -bottom-4 -right-2" :count="2" color="var(--spray-pink)" :animated="true" />
        </div>
        
        <!-- Loading Bar -->
        <div class="w-48 h-1.5 bg-black/20 rounded-full overflow-hidden relative">
          <div class="absolute top-0 left-0 h-full w-1/2 bg-[var(--color-accent)] rounded-full animate-loader-bar" />
        </div>
        
        <span class="mt-4 text-xs font-marker tracking-widest text-[var(--color-accent)] opacity-60">
          Cargando entorno...
        </span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.splash-leave-active {
  transition: opacity 0.6s cubic-bezier(0.8, 0, 0.2, 1), transform 0.6s cubic-bezier(0.8, 0, 0.2, 1);
}
.splash-leave-to {
  opacity: 0;
  transform: translateY(-20px);
  pointer-events: none;
}

@keyframes loader-bar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

.animate-loader-bar {
  animation: loader-bar 1s infinite linear;
}
</style>
