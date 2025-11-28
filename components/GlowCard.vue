<script setup>
import { computed } from 'vue'
const props = defineProps({
  isLight: { type: Boolean, default: false },
  rounded: { type: String, default: 'rounded-3xl' },
  bodyPadding: { type: String, default: 'p-6 sm:p-7 lg:p-8' },
  class: { type: String, default: '' }, // clases extra al wrapper exterior
  cardClass: { type: String, default: '' }, // clases adicionales al contenedor
  bodyClass: { type: String, default: '' }, // clases internas del body
  glow: { type: Boolean, default: false }, // halo exterior opcional
  motion: { type: Boolean, default: true }, // animacion de entrada/hover opcional
  float: { type: Boolean, default: false } // animacion continua sutil
})

const darkBase =
  'relative overflow-hidden transition-all duration-300 border-2 border-red-500 bg-transparent text-white shadow-none'
const lightBase =
  'relative overflow-hidden transition-all duration-300 border-2 border-red-600 bg-transparent text-slate-900 shadow-none'

const motionConfig = computed(() => {
  if (!props.motion) return null

  if (props.float) {
    return {
      initial: { opacity: 0, y: 16, scale: 0.99 },
      visible: {
        opacity: 1,
        y: [-2, 2, -2],
        scale: 1,
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
      }
    }
  }

  return {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } }
  }
})
</script>

<template>
  <div
    v-motion="motionConfig"
    class="group relative transition-all duration-300"
    :class="props.class"
  >
    <div
      v-if="props.glow"
      class="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] bg-red-500/20 blur-2xl opacity-80 group-hover:opacity-100 transition-all duration-300"
    />
    <div
      :class="[
        props.isLight ? lightBase : darkBase,
        props.cardClass,
        props.rounded,
        'transform-gpu',
        props.motion ? 'will-change-transform group-hover:-translate-y-1 group-hover:scale-[1.01]' : ''
      ]"
    >
      <div :class="`${props.bodyPadding} ${props.bodyClass}`">
        <slot />
      </div>
    </div>
  </div>
</template>
