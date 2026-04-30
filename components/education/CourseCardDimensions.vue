<template>
  <div class="dimensions-wrapper">
    <div class="card-3d__dimension card-3d__dimension--right" aria-hidden="true">
      <span class="card-3d__dim-line" />
      <span class="card-3d__dim-label">132px</span>
    </div>
    <div class="card-3d__dimension card-3d__dimension--bottom" aria-hidden="true">
      <span class="card-3d__dim-line" />
      <span class="card-3d__dim-label">240px</span>
    </div>
  </div>
</template>

<style scoped>
.card-3d__dimension {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.3s var(--ease-default);
  pointer-events: none;
  /* La opacidad se controla desde el padre (CourseCard3D.vue) */
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
</style>
