<script setup lang="ts">
defineProps<{
  period: string
}>()
</script>

<template>
  <!-- Pin -->
  <div class="wall-tag__pin" aria-hidden="true">
    <span class="wall-tag__pin-head" />
  </div>

  <!-- Period tape -->
  <span class="wall-tag__tape font-marker">
    {{ period }}
  </span>
</template>

<style scoped>
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
</style>