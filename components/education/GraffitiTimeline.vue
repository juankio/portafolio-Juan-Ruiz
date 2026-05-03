<script setup lang="ts">
import WallTag from './WallTag.vue'

interface CourseItem {
  title: string
  period: string
  place?: string
  detail?: string
}

const props = defineProps<{
  courses: CourseItem[]
  selectedCourse: { title: string } | null
  isLight: boolean
}>()

const emit = defineEmits<{
  select: [course: CourseItem]
}>()

const { locale } = useI18n()

// Alternate left/right for desktop timeline
const isLeft = (index: number) => index % 2 === 0
</script>

<template>
  <!-- Central spray-paint timeline line -->
  <div class="timeline-line" aria-hidden="true" />
  <div class="timeline-line timeline-line--glow" aria-hidden="true" />

  <!-- Tags on the wall — timeline layout -->
  <div role="list" aria-label="Cursos y certificaciones" class="timeline-list relative py-8 sm:py-12 timeline-animate-trigger animate-group">
    <div
      v-for="(course, idx) in courses"
      :key="idx"
      role="listitem"
      class="timeline-item animate-item opacity-0"
      :class="isLeft(idx) ? 'timeline-item--left' : 'timeline-item--right'"
    >
      <!-- Node on the line -->
      <div class="timeline-node" aria-hidden="true">
        <span class="timeline-node__dot" />
      </div>

      <!-- Card wrapper -->
      <div class="timeline-card-wrap">
        <WallTag
          :course="course"
          :index="idx"
          :is-selected="selectedCourse?.title === course.title"
          :is-light="isLight"
          @select="emit('select', course)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Central vertical spray-paint line */
.timeline-line {
  position: absolute;
  top: 2rem;
  bottom: 2rem;
  left: 1.5rem;
  width: 3px;
  background: repeating-linear-gradient(
    180deg,
    var(--color-accent) 0px,
    var(--color-accent) 14px,
    transparent 14px,
    transparent 20px,
    var(--color-accent) 20px,
    var(--color-accent) 38px,
    transparent 38px,
    transparent 44px
  );
  opacity: 0.35;
  border-radius: 2px;
  filter: blur(0.5px);
  z-index: 1;
}

.timeline-line--glow {
  width: 8px;
  left: calc(1.5rem - 2.5px);
  opacity: 0.08;
  filter: blur(6px);
  background: var(--color-accent);
}

@media (min-width: 768px) {
  .timeline-line,
  .timeline-line--glow {
    left: 50%;
    transform: translateX(-50%);
  }
  .timeline-line--glow {
    left: 50%;
  }
}

/* Timeline list container */
.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

@media (min-width: 768px) {
  .timeline-list {
    gap: 3.5rem;
  }
}

/* Each timeline row */
.timeline-item {
  position: relative;
  padding-left: 3.5rem;
  padding-right: 1.25rem; /* Evita que la tarjeta toque el borde derecho en celular */
  z-index: 2;
}

@media (min-width: 768px) {
  .timeline-item {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 2rem;
    padding-left: 0;
    padding-right: 0;
  }

  .timeline-item--left .timeline-card-wrap {
    grid-column: 1;
    justify-self: end;
  }

  .timeline-item--left .timeline-node {
    grid-column: 2;
  }

  .timeline-item--right .timeline-card-wrap {
    grid-column: 3;
    justify-self: start;
  }

  .timeline-item--right .timeline-node {
    grid-column: 2;
  }
}

/* Node on the central line */
.timeline-node {
  position: absolute;
  left: 1.5rem;
  top: 2rem;
  transform: translateX(-50%);
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.timeline-node__dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow:
    0 0 0 3px var(--color-wall),
    0 0 0 5px var(--color-accent-soft),
    0 0 12px var(--color-accent);
  animation: node-pulse 2.5s var(--ease-spring) infinite;
}

@media (min-width: 768px) {
  .timeline-node {
    position: relative;
    left: auto;
    top: auto;
    transform: none;
  }
}

@keyframes node-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow:
      0 0 0 3px var(--color-wall),
      0 0 0 5px var(--color-accent-soft),
      0 0 12px var(--color-accent);
  }
  50% {
    transform: scale(1.15);
    box-shadow:
      0 0 0 3px var(--color-wall),
      0 0 0 7px var(--color-accent-soft),
      0 0 20px var(--color-accent);
  }
}

/* Card wrapper */
.timeline-card-wrap {
  position: relative;
  z-index: 3;
}

@media (max-width: 767px) {
  .timeline-card-wrap {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .timeline-card-wrap {
    max-width: 420px;
    width: 100%;
  }
}
</style>
