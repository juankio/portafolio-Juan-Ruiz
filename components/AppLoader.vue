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
      direction: 'alternate',
      loop: true
    })

    // 2. Animación del punto siguiendo el path (Motion Path en AnimeJS v4)
    const { translateX, translateY, rotate } = svg.createMotionPath(pathRef.value)
    
    pathAnimation = animate(followerRef.value, {
      translateX,
      translateY,
      rotate,
      ease: 'linear',
      duration: 3000,
      loop: true
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
      
      <div class="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        
        <!-- Contenedor del trazado SVG animado -->
        <div class="relative w-full h-40 mb-2">
          <!-- Símbolo "Hacker" de terminal / código con circuito -->
          <svg class="w-full h-full absolute inset-0 overflow-visible" viewBox="0 0 300 120" fill="none" stroke-width="2">
            <!-- Puntos decorativos del circuito -->
            <circle cx="10" cy="60" r="3" fill="var(--color-surface)" stroke="var(--color-border-accent)" />
            <circle cx="150" cy="10" r="3" fill="var(--color-surface)" stroke="var(--color-border-accent)" />
            <circle cx="290" cy="60" r="3" fill="var(--color-surface)" stroke="var(--color-border-accent)" />
            <circle cx="150" cy="110" r="3" fill="var(--color-surface)" stroke="var(--color-border-accent)" />

            <!-- Etiquetas decorativas < > -->
            <text x="30" y="65" font-family="'Inter', monospace" font-size="18" font-weight="bold" fill="var(--color-border-accent)" opacity="0.5">&lt;</text>
            <text x="255" y="65" font-family="'Inter', monospace" font-size="18" font-weight="bold" fill="var(--color-border-accent)" opacity="0.5">/&gt;</text>

            <!-- Path de circuito complejo que recorre el diseño -->
            <path 
              ref="pathRef"
              class="loader-circuit-path"
              d="M 10 60 L 40 60 L 60 20 L 120 20 L 150 10 L 180 20 L 240 20 L 260 60 L 290 60 L 260 60 L 240 100 L 180 100 L 150 110 L 120 100 L 60 100 L 40 60 Z" 
              stroke="var(--color-accent)" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              opacity="0.8"
            />
          </svg>

          <!-- El elemento que sigue el Path (Chispa de datos) -->
          <div 
            ref="followerRef"
            class="loader-spark absolute top-0 left-0 w-3 h-3 bg-white rounded-full shadow-[0_0_12px_var(--color-accent),0_0_24px_var(--color-accent)] pointer-events-none"
            style="transform-origin: center center; margin-top: -6px; margin-left: -6px;"
          />
        </div>
        
        <div class="relative mb-2 mt-4">
          <span class="font-marker text-4xl sm:text-5xl text-spray text-white tracking-widest animate-pulse">
            JMRS
          </span>
          <PaintDrip class="absolute -bottom-2 -right-2" :count="1" color="var(--color-accent)" :animated="true" />
        </div>
        
        <span class="mt-4 text-[0.65rem] font-mono uppercase tracking-[0.25em] text-[var(--color-accent)] opacity-60">
          [ compilando_entorno ]
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
</style>
