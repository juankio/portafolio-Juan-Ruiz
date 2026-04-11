<script setup>
const props = defineProps({
  isLight: { type: Boolean, default: false },
  courses: { type: Array, default: () => [] },
  selectedCourse: { type: Object, default: null }
})

const emit = defineEmits(['select'])

const { t } = useI18n()

const getCourseListClass = (item) => {
  const active = props.selectedCourse && item.title === props.selectedCourse.title
  if (active) {
    return 'summary-item--active'
  }
  return 'summary-item--default'
}

const onSelect = (item) => emit('select', item)
</script>

<template>
  <div class="summary-panel" :class="isLight ? 'summary-panel--light' : ''">
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="summary-overline">{{ t('education.summary') }}</p>
        <p class="summary-title">{{ t('education.nodeSelection') }}</p>
      </div>
      <span class="summary-count">
        {{ courses.length }} {{ t('education.coursesLabel') }}
      </span>
    </div>

    <div class="summary-hint">
      <span class="summary-hint__line" />
      <span class="leading-tight">{{ t('education.hint') }}</span>
    </div>

    <!-- Lista de cursos con micro-3D hover -->
    <div class="summary-list" style="perspective: 800px">
      <button
        v-for="item in courses"
        :key="'list-' + item.title"
        class="summary-item"
        :class="getCourseListClass(item)"
        @click="onSelect(item)"
      >
        <span class="text-sm font-semibold leading-tight line-clamp-1">{{ item.title }}</span>
        <span class="summary-item__period">
          {{ item.period }}
        </span>
      </button>
    </div>

    <!-- Detalle del curso seleccionado -->
    <Transition name="detail">
      <div v-if="selectedCourse" :key="selectedCourse.title" class="summary-detail">
        <div class="flex items-center gap-2 mb-2">
          <UIcon name="i-heroicons-academic-cap-20-solid" class="text-(--color-accent) w-4 h-4" />
          <span class="text-[11px] font-semibold uppercase tracking-wide" style="color: var(--color-accent)">
            {{ t('education.certificate') }}
          </span>
        </div>
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
          <span style="color: var(--color-accent)">{{ selectedCourse.period }}</span>
          <span class="text-[11px]" style="color: var(--color-text-secondary)">{{ selectedCourse.place }}</span>
        </div>
        <p class="text-sm font-semibold leading-snug" style="color: var(--color-text-primary)">{{ selectedCourse.title }}</p>
        <p class="text-xs leading-snug" style="color: var(--color-text-secondary)">{{ selectedCourse.detail }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.summary-panel {
  display: flex;
  height: 100%;
  flex-direction: column;
  gap: 1rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  padding: 1rem 1.25rem;
  backdrop-filter: blur(16px);
  background: rgba(0, 0, 0, 0.7);
  box-shadow: var(--shadow-card);
}

.summary-panel--light {
  background: rgba(209, 213, 219, 0.9);
  border-color: rgba(209, 213, 219, 0.6);
}

.summary-overline {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: var(--color-text-secondary);
}

.summary-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-text-primary);
}

.summary-count {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 4px 12px;
  border-radius: 9999px;
  background: var(--color-accent-soft);
  color: var(--color-accent-light);
}

.summary-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--color-text-secondary);
}

.summary-hint__line {
  display: block;
  height: 3px;
  width: 2.5rem;
  border-radius: 9999px;
  background: var(--color-accent);
}

.summary-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  padding-right: 4px;
  max-height: 340px;
}

.summary-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.75rem;
  text-align: left;
  transition: all var(--duration-normal) var(--ease-default);
}

.summary-item:hover {
  transform: translateZ(4px) scale(1.01);
}

.summary-item--default {
  background: var(--color-accent-softer);
  color: var(--color-text-primary);
}

.summary-item--default:hover {
  background: var(--color-accent-soft);
}

.summary-item--active {
  background: var(--color-accent-soft);
  color: var(--color-text-primary);
  box-shadow: inset 0 0 0 1px var(--color-border-accent);
}

.summary-item__period {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 9999px;
  background: var(--color-accent-softer);
  color: var(--color-accent);
  flex-shrink: 0;
}

.summary-detail {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 4px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  padding: 0.75rem;
  background: var(--color-accent-softer);
}

/* Transicion de entrada del detalle */
.detail-enter-active {
  transition: all 0.35s var(--ease-spring);
}
.detail-leave-active {
  transition: all 0.2s var(--ease-default);
}
.detail-enter-from {
  opacity: 0;
  transform: perspective(600px) rotateX(8deg) translateY(8px);
}
.detail-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
