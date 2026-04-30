<script setup>
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
const props = defineProps({
  
  rounded: { type: String, default: 'rounded-2xl' },
  bodyPadding: { type: String, default: 'p-5 sm:p-6' },
  class: { type: String, default: '' },
  cardClass: { type: String, default: '' },
  bodyClass: { type: String, default: '' },
  glow: { type: Boolean, default: false },
  motion: { type: Boolean, default: true },
  float: { type: Boolean, default: false },
  overflowVisible: { type: Boolean, default: false },
  delay: { type: Number, default: 0 },
  highlight: { type: Boolean, default: true }
})

const overflowClass = computed(() => (props.overflowVisible ? '!overflow-visible' : 'overflow-hidden'))
</script>

<template>
  <div 
    class="group relative" 
    :class="[props.class, props.float ? 'animate-float' : '']"
    :style="props.delay ? `animation-delay: ${props.delay}ms` : ''"
  >
    <div
      :class="[
        'glow-card relative transition-all duration-200',
        overflowClass,
        props.cardClass,
        props.rounded,
        props.motion ? 'hover:-translate-y-0.5' : ''
      ]"
    >
      <div :class="`${props.bodyPadding} ${props.bodyClass}`">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.glow-card {
  border: 1px solid var(--color-border);
  background: var(--color-surface-card);
  box-shadow: var(--shadow-card);
}

.animate-float {
  animation: float-animation 6s ease-in-out infinite;
}

@keyframes float-animation {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}
</style>
