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

const delayMs = computed(() => props.index * 80)
</script>

<template>
  <div
    class="card-3d-wrapper cursor-pointer"
    :style="{ animationDelay: `${delayMs}ms` }"
    @click="emit('select')"
  >
    <div
      class="card-3d"
      :class="[
        isSelected ? 'card-3d--selected' : '',
        isLight ? 'card-3d--light' : ''
      ]"
    >
      <!-- Cara frontal -->
      <div class="card-3d__face">
        <!-- Numero + periodo -->
        <div class="flex items-center justify-between gap-3">
          <span class="card-3d__index">
            {{ index + 1 < 10 ? `0${index + 1}` : index + 1 }}
          </span>
          <span class="card-3d__badge">
            {{ course.period }}
          </span>
        </div>

        <!-- Titulo -->
        <p class="card-3d__title">
          {{ course.title }}
        </p>

        <!-- Institucion -->
        <p v-if="course.place" class="card-3d__place">
          {{ course.place }}
        </p>

        <!-- Lineas de capas 3D (decorativo) -->
        <div class="card-3d__layers" aria-hidden="true">
          <span /><span /><span />
        </div>
      </div>

      <!-- Anotacion de dimensiones tipo blueprint (decorativo) -->
      <div class="card-3d__dimension card-3d__dimension--right" aria-hidden="true">
        <span class="card-3d__dim-line" />
        <span class="card-3d__dim-label">132px</span>
      </div>
      <div class="card-3d__dimension card-3d__dimension--bottom" aria-hidden="true">
        <span class="card-3d__dim-line" />
        <span class="card-3d__dim-label">240px</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-3d-wrapper {
  perspective: var(--perspective, 1200px);
  animation: card3d-enter 0.5s var(--ease-out, cubic-bezier(0, 0, 0.2, 1)) backwards;
}

.card-3d {
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(6deg) rotateY(-4deg);
  transition: transform 0.4s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  will-change: transform;
}

.card-3d:hover {
  transform: rotateX(2deg) rotateY(-1deg) translateZ(12px);
}

.card-3d--selected {
  transform: rotateX(4deg) rotateY(-2deg) translateZ(8px);
}

.card-3d--selected:hover {
  transform: rotateX(2deg) rotateY(-1deg) translateZ(16px);
}

/* ─── Cara frontal ─── */
.card-3d__face {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px 16px 18px;
  border-radius: var(--radius-md, 16px);
  border: 2px solid var(--color-border-accent);
  background: var(--color-surface-card);
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-card);
  z-index: 1;
}

/* Borde derecho — grosor visible */
.card-3d__face::after {
  content: '';
  position: absolute;
  top: 2px;
  right: -8px;
  width: 8px;
  height: calc(100% - 4px);
  border-radius: 0 4px 4px 0;
  background: linear-gradient(180deg, var(--color-accent-dark), color-mix(in srgb, var(--color-accent-dark), black 30%));
  transform: rotateY(90deg);
  transform-origin: left center;
}

/* Borde inferior — grosor visible */
.card-3d__face::before {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 2px;
  width: calc(100% - 4px);
  height: 8px;
  border-radius: 0 0 4px 4px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--color-accent-dark), black 25%), color-mix(in srgb, var(--color-accent-dark), black 40%));
  transform: rotateX(-90deg);
  transform-origin: top center;
}

/* Responsive: grosor menor en mobile */
@media (max-width: 640px) {
  .card-3d__face::after { width: 4px; right: -4px; }
  .card-3d__face::before { height: 4px; bottom: -4px; }
  .card-3d { transform: rotateX(4deg) rotateY(-3deg); }
  .card-3d:hover { transform: rotateX(1deg) rotateY(-1deg) translateZ(8px); }
}

/* ─── Textos ─── */
.card-3d__index {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-accent);
}

.card-3d__badge {
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
  background: var(--color-accent-soft);
  color: var(--color-accent-light);
}

.card-3d__title {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--color-text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-3d__place {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-accent);
  opacity: 0.85;
}

/* ─── Lineas de capas 3D (impresion 3D) ─── */
.card-3d__layers {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 4px;
  padding-top: 6px;
  border-top: 1px solid var(--color-border);
}

.card-3d__layers span {
  display: block;
  height: 1.5px;
  border-radius: 1px;
  background: var(--color-accent);
  opacity: 0.15;
}

.card-3d__layers span:nth-child(1) { width: 100%; opacity: 0.2; }
.card-3d__layers span:nth-child(2) { width: 75%; opacity: 0.12; }
.card-3d__layers span:nth-child(3) { width: 50%; opacity: 0.08; }

/* ─── Anotaciones de dimensiones (blueprint) ─── */
.card-3d__dimension {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.3s var(--ease-default);
  pointer-events: none;
}

.card-3d:hover .card-3d__dimension {
  opacity: 0.5;
}

.card-3d__dimension--right {
  right: -38px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  flex-direction: row;
}

.card-3d__dimension--bottom {
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  flex-direction: row;
}

.card-3d__dim-line {
  display: block;
  width: 20px;
  height: 1px;
  background: var(--color-accent);
  opacity: 0.6;
}

.card-3d__dim-label {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-accent);
  font-family: 'Inter', monospace;
  white-space: nowrap;
}

/* ─── Selected state ─── */
.card-3d--selected .card-3d__face {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-glow);
}

.card-3d--selected .card-3d__dimension {
  opacity: 0.6;
}

/* ─── Light mode overrides via parent class ─── */
.card-3d--light .card-3d__badge {
  color: var(--color-accent-dark);
}

/* ─── Entrada escalonada ─── */
@keyframes card3d-enter {
  from {
    opacity: 0;
    transform: perspective(1200px) rotateX(35deg) scale(0.85);
  }
  to {
    opacity: 1;
    transform: perspective(1200px) rotateX(0deg) scale(1);
  }
}
</style>
