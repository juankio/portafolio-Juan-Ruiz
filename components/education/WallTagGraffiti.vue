<script setup lang="ts">
defineProps<{
  number: string
  tagAccent: string
  isSelected: boolean
}>()
</script>

<template>
  <!-- Number splash — big graffiti number -->
  <span class="wall-tag__number font-marker">
    {{ number }}
  </span>

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
</template>

<style scoped>
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
  transition: opacity 0.3s ease;
}

.wall-tag__spray {
  position: absolute;
  bottom: -10px;
  right: -10px;
  width: 50px;
  height: 50px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

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
</style>