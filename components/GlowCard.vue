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
  float: { type: Boolean, default: false }, // animacion continua sutil
  overflowVisible: { type: Boolean, default: false }, // permitir que el contenido se desborde del borde
  delay: { type: Number, default: 0 } // retardo para stagger
})

const borderClass = computed(() => (props.isLight ? 'border-green-500' : 'border-red-500'))
const haloClass = computed(() => (props.isLight ? 'bg-green-500/20' : 'bg-red-500/20'))

const overflowClass = computed(() => (props.overflowVisible ? '!overflow-visible' : 'overflow-hidden'))

const darkBase =
  'relative transition-all duration-300 border-2 bg-transparent text-white shadow-none'
const lightBase =
  'relative transition-all duration-300 border-2 bg-transparent text-slate-800 shadow-none'

const motionConfig = computed(() => {
  if (!props.motion) return null

  if (props.float) {
    return {
      initial: { opacity: 0, y: 12, scale: 0.98 },
      visible: {
        opacity: 1,
        y: [-4, 4, -4],
        scale: 1,
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: props.delay / 1000 }
      }
    }
  }

  return {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut', delay: props.delay / 1000 } }
  }
})

const hasMotion = computed(() => !!motionConfig.value)
</script>

<template>
  <div v-if="hasMotion" v-motion="motionConfig" class="group relative transition-all duration-300" :class="props.class">
    <div
      v-if="props.glow"
      class="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] blur-2xl opacity-80 group-hover:opacity-100 transition-all duration-300"
      :class="haloClass"
    />
    <div
      :class="[
        props.isLight ? lightBase : darkBase,
        overflowClass,
        props.cardClass,
        props.rounded,
        borderClass,
        'transform-gpu',
        props.motion ? 'will-change-transform group-hover:-translate-y-1 group-hover:scale-[1.01]' : ''
      ]"
    >
      <div :class="`${props.bodyPadding} ${props.bodyClass}`">
        <slot />
      </div>
    </div>
  </div>
  <div v-else class="group relative transition-all duration-300" :class="props.class">
    <div
      v-if="props.glow"
      class="pointer-events-none absolute -inset-5 -z-10 rounded-[32px] blur-2xl opacity-80 group-hover:opacity-100 transition-all duration-300"
      :class="haloClass"
    />
    <div
      :class="[
        props.isLight ? lightBase : darkBase,
        overflowClass,
        props.cardClass,
        props.rounded,
        borderClass,
        'transform-gpu'
      ]"
    >
      <div :class="`${props.bodyPadding} ${props.bodyClass}`">
        <slot />
      </div>
    </div>
  </div>
</template>
