<script setup lang="ts">
defineProps<{
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
</script>

<template>
  <div class="card-3d__face" :class="{ 'is-selected': isSelected, 'is-light': isLight }">
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
</template>

<style scoped>
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

.is-selected {
  border-color: var(--color-accent);
  box-shadow: var(--shadow-glow);
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

.is-light .card-3d__badge {
  color: var(--color-accent-dark);
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
</style>
