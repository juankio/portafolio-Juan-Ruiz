<script setup>
const props = defineProps({
  isLight: { type: Boolean, default: false },
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

const motionConfig = computed(() => {
  if (!props.motion) return null

  if (props.float) {
    return {
      initial: { opacity: 0, y: 8 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut', delay: props.delay / 1000 }
      }
    }
  }

  return {
    initial: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut', delay: props.delay / 1000 } }
  }
})

const hasMotion = computed(() => !!motionConfig.value)
</script>

<template>
  <div v-if="hasMotion" v-motion="motionConfig" class="group relative" :class="props.class">
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
  <div v-else class="group relative" :class="props.class">
    <div
      :class="[
        'glow-card relative transition-all duration-200',
        overflowClass,
        props.cardClass,
        props.rounded
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
</style>
