<script setup lang="ts">
const isLight = inject('isLight', ref(false))
const props = defineProps<{
  course: {
    title: string
    period: string
    place?: string
    detail?: string
  }
  index: number
  isSelected: boolean
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
      <CourseCardFront
        :course="course"
        :index="index"
        :is-selected="isSelected"
        :is-light="isLight"
      />

      <CourseCardDimensions />
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

/* ─── Control de opacidad para Dimensions ─── */
:deep(.card-3d__dimension) {
  opacity: 0;
}

.card-3d:hover :deep(.card-3d__dimension) {
  opacity: 0.5;
}

.card-3d--selected :deep(.card-3d__dimension) {
  opacity: 0.6;
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

/* Responsive: grosor menor en mobile */
@media (max-width: 640px) {
  .card-3d { transform: rotateX(4deg) rotateY(-3deg); }
  .card-3d:hover { transform: rotateX(1deg) rotateY(-1deg) translateZ(8px); }
}
</style>
