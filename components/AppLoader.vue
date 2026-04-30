<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { animate, svg } from 'animejs'
import PaintDrip from './graffiti/PaintDrip.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const isLoaded = ref(false)
const pathRef = ref(null)
const followerRef = ref(null)

let pathAnimation: any = null
let drawAnimation: any = null

onMounted(() => {
  if (pathRef.value && followerRef.value) {
    // 1. Animación del dibujo de la línea (SVG path)
    drawAnimation = animate(svg.createDrawable(pathRef.value), {
      draw: '0 1',
      ease: 'inOutSine',
      duration: 1500,
      alternate: true,
      loop: true
    })

    // 2. Animación del punto siguiendo el path (Motion Path en AnimeJS v4)
    pathAnimation = animate(followerRef.value, {
      ease: 'linear',
      duration: 3000,
      loop: true,
      ...svg.createMotionPath(pathRef.value)
    })
  }

  // Ocultar el loader después de un retraso inicial
  setTimeout(() => {
    isLoaded.value = true
  }, 1200)
})

onBeforeUnmount(() => {
  if (pathAnimation) pathAnimation.pause()
  if (drawAnimation) drawAnimation.pause()
})
</script>

<template>
  <Transition name="splash">
    <div
      v-if="!isLoaded"
      class="fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-colors duration-300 bg-brick"
    >
      <div class="absolute inset-0 bg-concrete pointer-events-none" />
      
      <div class="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        
        <!-- Contenedor del trazado SVG animado -->
        <div class="relative w-full h-32 mb-8">
          <!-- El SVG de "Programación" (Ej. Un símbolo de < > o nodos conectados) -->
          <svg class="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 300 100" fill="none" stroke="var(--color-border-accent)" stroke-width="2">
             <!-- Un path abstracto que parece un circuito o estructura de código -->
             <path 
                ref="pathRef"
                d="M 20 50 L 60 50 L 90 20 L 130 20 L 160 80 L 210 80 L 240 50 L 280 50" 
                stroke="var(--color-accent)" 
                stroke-width="3" 
                stroke-linecap="round" 
                stroke-linejoin="round" 
              />
              
              <!-- Nodos de decoración estáticos -->
              <circle cx="20" cy="50" r="4" fill="var(--color-surface)" stroke="var(--color-accent)" stroke-width="2" />
              <circle cx="90" cy="20" r="4" fill="var(--color-surface)" stroke="var(--color-accent)" stroke-width="2" />
              <circle cx="160" cy="80" r="4" fill="var(--color-surface)" stroke="var(--color-accent)" stroke-width="2" />
              <circle cx="280" cy="50" r="4" fill="var(--color-surface)" stroke="var(--color-accent)" stroke-width="2" />
          </svg>

          <!-- El elemento que sigue el Path (nuestro "carro" que ahora es una chispa de código) -->
          <div 
            ref="followerRef"
            class="absolute top-0 left-0 w-3 h-3 bg-white rounded-full shadow-[0_0_12px_var(--color-accent),0_0_24px_var(--color-accent)] pointer-events-none"
            style="transform-origin: center center;"
          />
        </div>
        
        <div class="relative mb-2">
          <span class="font-marker text-4xl sm:text-5xl text-spray text-white tracking-widest animate-pulse">
            JMRS
          </span>
          <PaintDrip class="absolute -bottom-2 -right-2" :count="1" color="var(--color-accent)" :animated="true" />
        </div>
        
        <span class="mt-4 text-xs font-marker tracking-widest text-[var(--color-accent)] opacity-60">
          Compilando entorno...
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
  transform: translateY(-20px)
}
</style>
