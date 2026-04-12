<script setup lang="ts">
const props = defineProps<{
  course: {
    title: string
    period: string
    place?: string
    detail?: string
  }
  index: number
  isSelected: boolean
  isLight: boolean
}>()

const emit = defineEmits<{
  select: []
}>()

const rotation = computed(() => {
  const angles = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2, 2.8]
  return angles[props.index % angles.length]
})

const number = computed(() => props.index + 1 < 10 ? `0${props.index + 1}` : `${props.index + 1}`)

const accentColors = ['var(--spray-red)', 'var(--spray-cyan)', 'var(--spray-yellow)', 'var(--spray-pink)', 'var(--spray-orange)']
const tagAccent = computed(() => accentColors[props.index % accentColors.length])
</script>

<template>
  <button
    class="wall-tag group relative text-left transition-all duration-300"
    :class="[
      isSelected ? 'wall-tag--selected' : '',
      isLight ? 'wall-tag--light' : ''
    ]"
    :style="{
      '--tag-rotate': `${rotation}deg`,
      '--tag-accent': tagAccent,
      transform: `rotate(${rotation}deg)`
    }"
    :aria-label="`Ver detalle: ${course.title}`"
    :aria-expanded="isSelected"
    @click="emit('select')"
  >
    <!-- Pin -->
    <div class="wall-tag__pin" aria-hidden="true">
      <span class="wall-tag__pin-head" />
    </div>

    <!-- Number splash — big graffiti number -->
    <span class="wall-tag__number font-marker">
      {{ number }}
    </span>

    <!-- Period tape -->
    <span class="wall-tag__tape font-marker">
      {{ course.period }}
    </span>

    <!-- Content -->
    <p class="wall-tag__title">
      {{ course.title }}
    </p>

    <p v-if="course.place" class="wall-tag__place font-marker">
      {{ course.place }}
    </p>

    <!-- Expand detail on selected -->
    <Transition name="detail-expand">
      <p v-if="isSelected && course.detail" class="wall-tag__detail">
        {{ course.detail }}
      </p>
    </Transition>

    <!-- Spray dots decoration -->
    <svg class="wall-tag__spray" viewBox="0 0 50 50" aria-hidden="true">
      <circle cx="5" cy="8" r="2.5" :fill="tagAccent" opacity="0.25" />
      <circle cx="18" cy="3" r="1.5" :fill="tagAccent" opacity="0.2" />
      <circle cx="30" cy="15" r="3.5" :fill="tagAccent" opacity="0.12" />
      <circle cx="42" cy="6" r="1.5" :fill="tagAccent" opacity="0.25" />
      <circle cx="22" cy="22" r="2" :fill="tagAccent" opacity="0.15" />
      <circle cx="38" cy="20" r="1" :fill="tagAccent" opacity="0.3" />
      <circle cx="8" cy="20" r="1.5" :fill="tagAccent" opacity="0.18" />
    </svg>

    <!-- Drip line on selected -->
    <div v-if="isSelected" class="wall-tag__drip" aria-hidden="true">
      <span /><span /><span />
    </div>

    <!-- Neon underline on hover -->
    <div class="wall-tag__glow" aria-hidden="true" />
  </button>
</template>

<style scoped>
.wall-tag {
  position: relative;
  padding: 1.25rem 1.5rem 1.25rem 3.5rem;
  border-radius: 4px 12px 6px 10px;
  border: 2px solid var(--color-border);
  background: var(--color-surface-card);
  backdrop-filter: blur(8px);
  cursor: pointer;
  transition: all 0.3s var(--ease-spring);
  max-width: 400px;
  width: 100%;
}

.wall-tag:hover {
  transform: rotate(0deg) scale(1.03) !important;
  box-shadow: 0 0 12px var(--tag-accent, var(--color-accent)), 0 0 32px rgba(0,0,0,0.3);
  border-color: var(--tag-accent, var(--color-accent));
}

.wall-tag--selected {
  border-color: var(--tag-accent, var(--color-accent));
  box-shadow: 0 0 12px var(--tag-accent, var(--color-accent)), 0 0 32px rgba(0,0,0,0.3);
}

.wall-tag--light {
  background: rgba(255, 255, 255, 0.92);
}

/* Pin */
.wall-tag__pin {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.wall-tag__pin-head {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--tag-accent, var(--color-accent));
  box-shadow: 0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 3px rgba(0,0,0,0.2), 0 0 8px var(--tag-accent, var(--color-accent));
}

/* Number — big graffiti style */
.wall-tag__number {
  position: absolute;
  top: 0.5rem;
  left: 0.6rem;
  font-size: 2rem;
  line-height: 1;
  color: var(--tag-accent, var(--color-accent));
  opacity: 0.2;
  letter-spacing: 0;
  text-shadow: 2px 2px 0 rgba(0,0,0,0.3);
}

.wall-tag:hover .wall-tag__number,
.wall-tag--selected .wall-tag__number {
  opacity: 0.4;
}

/* Period tape */
.wall-tag__tape {
  position: absolute;
  top: -1px;
  right: 1rem;
  background: var(--tag-accent, var(--color-accent));
  color: white;
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  padding: 3px 10px;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  transform: rotate(1deg);
}

/* Title */
.wall-tag__title {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.wall-tag--selected .wall-tag__title {
  -webkit-line-clamp: unset;
}

/* Place */
.wall-tag__place {
  margin-top: 4px;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--tag-accent, var(--color-accent));
  opacity: 0.8;
}

/* Detail */
.wall-tag__detail {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--color-border);
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  line-height: 1.5;
  color: var(--color-text-secondary);
}

/* Spray dots */
.wall-tag__spray {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 50px;
  height: 50px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.wall-tag:hover .wall-tag__spray,
.wall-tag--selected .wall-tag__spray {
  opacity: 1;
}

/* Drip effect on selected */
.wall-tag__drip {
  position: absolute;
  bottom: -16px;
  left: 1.5rem;
  display: flex;
  gap: 8px;
}

.wall-tag__drip span {
  width: 3px;
  border-radius: 0 0 2px 2px;
  background: var(--tag-accent, var(--color-accent));
  animation: drip 1.2s ease-out forwards;
}

.wall-tag__drip span:nth-child(1) {
  height: 0;
  opacity: 0.6;
  animation-delay: 0s;
}

.wall-tag__drip span:nth-child(2) {
  height: 0;
  opacity: 0.4;
  animation-delay: 0.3s;
}

.wall-tag__drip span:nth-child(3) {
  height: 0;
  opacity: 0.5;
  animation-delay: 0.15s;
}

/* Neon glow underline on hover */
.wall-tag__glow {
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--tag-accent, var(--color-accent));
  border-radius: 2px;
  opacity: 0;
  filter: blur(3px);
  transition: opacity 0.3s ease;
}

.wall-tag:hover .wall-tag__glow,
.wall-tag--selected .wall-tag__glow {
  opacity: 0.6;
}

/* Detail transition */
.detail-expand-enter-active {
  transition: all 0.35s var(--ease-spring);
}
.detail-expand-leave-active {
  transition: all 0.2s ease;
}
.detail-expand-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-4px);
}
.detail-expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.detail-expand-enter-to,
.detail-expand-leave-from {
  max-height: 200px;
}
</style>
