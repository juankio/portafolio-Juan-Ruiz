<script setup lang="ts">
const isLight = inject('isLight', ref(false))
import { inject,  ref, onMounted, onBeforeUnmount  } from 'vue'
import { animate, svg, remove } from 'animejs'
import PaintDrip from './graffiti/PaintDrip.vue'



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
      ease: 'inOutCubic',
      duration: 2000,
      direction: 'alternate',
      loop: true
    })

    // 2. Animación del punto siguiendo el path (Motion Path en AnimeJS v4)
    const { translateX, translateY, rotate } = svg.createMotionPath(pathRef.value)
    
    pathAnimation = animate(followerRef.value, {
      translateX,
      translateY,
      rotate,
      ease: 'inOutCubic',
      duration: 4000,
      direction: 'alternate',
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
  if (pathRef.value) remove(pathRef.value)
  if (followerRef.value) remove(followerRef.value)
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
        <div class="relative w-full h-32 mb-2 flex justify-center items-center">
          <svg class="w-24 h-24 sm:w-32 sm:h-32 overflow-visible" viewBox="0 0 100 70" fill="none" stroke-width="2">
            <!-- Definir filtro de brillo para la chispa -->
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <!-- Corona de Graffiti Path -->
            <path 
              ref="pathRef"
              class="loader-circuit-path"
              d="M10 60 L10 25 L30 40 L50 10 L70 40 L90 25 L90 60 Z" 
              stroke="var(--color-accent)" 
              stroke-width="3" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-dasharray="1000"
              stroke-dashoffset="1000"
              opacity="0.8"
            />
            
            <!-- Gotas decorativas -->
            <circle cx="10" cy="20" r="4" fill="var(--color-accent)" opacity="0.6" />
            <circle cx="50" cy="5" r="4" fill="var(--color-accent)" opacity="0.6" />
            <circle cx="90" cy="20" r="4" fill="var(--color-accent)" opacity="0.6" />

            <!-- Chispa de datos (ahora dentro del SVG) -->
            <circle
              ref="followerRef"
              cx="10"
              cy="60"
              r="3.5"
              fill="#ffffff"
              filter="url(#glow)"
              style="transform-origin: 0 0;"
            />
          </svg>
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
