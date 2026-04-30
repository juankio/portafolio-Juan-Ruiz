<script setup lang="ts">
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
defineProps<{
  
  variant?: 'project' | 'flyer'
}>()
</script>

<template>
  <div class="skel-card" :class="variant === 'flyer' ? 'skel-card--flyer' : 'skel-card--project'">
    <!-- Pin -->
    <div class="skel-card__pin" aria-hidden="true" />

    <!-- Tape accent -->
    <div class="skel-card__tape" aria-hidden="true" />

    <!-- Thumbnail placeholder for project -->
    <div v-if="variant !== 'flyer'" class="skel-card__thumb">
      <div class="skel-shimmer" />
    </div>

    <!-- Content lines -->
    <div class="skel-card__body">
      <div class="skel-line skel-line--label">
        <div class="skel-shimmer" />
      </div>
      <div class="skel-line skel-line--title">
        <div class="skel-shimmer" />
      </div>
      <div class="skel-line skel-line--text">
        <div class="skel-shimmer" />
      </div>
      <div class="skel-line skel-line--text skel-line--short">
        <div class="skel-shimmer" />
      </div>

      <div v-if="variant !== 'flyer'" class="skel-card__meta">
        <div class="skel-chip">
          <div class="skel-shimmer" />
        </div>
        <div class="skel-chip skel-chip--wide">
          <div class="skel-shimmer" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skel-card {
  position: relative;
  overflow: hidden;
  border: 2px solid var(--color-border);
  background: var(--color-surface-card);
  border-radius: 4px 12px 6px 10px;
}

.skel-card--project {
  display: flex;
  flex-direction: column;
}

.skel-card--flyer {
  padding: 1.25rem 1.25rem 1.25rem 1rem;
}

/* Pin decoration */
.skel-card__pin {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  opacity: 0.4;
  z-index: 2;
}

/* Tape corner decoration */
.skel-card__tape {
  position: absolute;
  top: -2px;
  right: 1rem;
  width: 40px;
  height: 10px;
  background: var(--color-accent);
  opacity: 0.25;
  transform: rotate(2deg);
  border-radius: 0 0 2px 2px;
}

/* Thumbnail placeholder — 16:9 */
.skel-card__thumb {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  background: var(--color-accent-softer);
  border-bottom: 2px dashed var(--color-border);
}

/* Body content */
.skel-card__body {
  padding: 1.25rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.skel-card--flyer .skel-card__body {
  padding: 0.5rem 0 0;
}

/* Lines */
.skel-line {
  position: relative;
  overflow: hidden;
  background: var(--color-accent-softer);
  border-radius: 3px;
}

.skel-line--label {
  width: 30%;
  height: 10px;
  margin-bottom: 0.5rem;
}

.skel-line--title {
  width: 75%;
  height: 20px;
  margin-bottom: 0.25rem;
}

.skel-line--text {
  width: 100%;
  height: 12px;
}

.skel-line--short {
  width: 60%;
}

/* Meta chips (stars, date) */
.skel-card__meta {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.skel-chip {
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 14px;
  background: var(--color-accent-softer);
  border-radius: 3px;
}

.skel-chip--wide {
  width: 80px;
}

/* Shimmer effect — spray sweep */
.skel-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-accent-soft) 40%,
    var(--color-accent-soft) 60%,
    transparent 100%
  );
  animation: spray-shimmer 1.8s ease-in-out infinite;
}

@keyframes spray-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(200%);
  }
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .skel-shimmer {
    animation: none;
    opacity: 0.4;
  }
}
</style>
