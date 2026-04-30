<script setup lang="ts">
defineProps<{
  course: {
    title: string
    place?: string
    detail?: string
  }
  isSelected: boolean
}>()
</script>

<template>
  <!-- Content -->
  <p class="wall-tag__title">
    {{ course.title }}
  </p>

  <p v-if="course.place" class="wall-tag__place font-marker">
    {{ course.place }}
  </p>

  <!-- Expand detail on selected -->
  <div class="wall-tag__detail-wrapper" :class="{ 'is-expanded': isSelected }">
    <div class="wall-tag__detail-inner">
      <p v-if="course.detail" class="wall-tag__detail-text">
        {{ course.detail }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.wall-tag__title {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-text-primary);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

.wall-tag__place {
  margin-top: 4px;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--tag-accent, var(--color-accent));
  opacity: 0.8;
}

.wall-tag__detail-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: grid-template-rows;
}

.wall-tag__detail-wrapper.is-expanded {
  grid-template-rows: 1fr;
}

.wall-tag__detail-inner {
  overflow: hidden;
  perspective: 1000px;
  min-height: 0;
}

.wall-tag__detail-text {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--color-border);
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  line-height: 1.5;
  color: var(--color-text-secondary);
  
  opacity: 0;
  transform: rotateX(-90deg) translateY(-10px);
  transform-origin: top;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.wall-tag__detail-wrapper.is-expanded .wall-tag__detail-text {
  opacity: 1;
  transform: rotateX(0deg) translateY(0);
  transition-delay: 0.1s;
}
</style>