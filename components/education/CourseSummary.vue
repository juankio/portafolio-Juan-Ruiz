<script setup>
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
const props = defineProps({
  
  courses: { type: Array, default: () => [] },
  selectedCourse: { type: Object, default: null }
})

const emit = defineEmits(['select'])

const { t } = useI18n()

const getCourseListClass = (item) => {
  const active = props.selectedCourse && item.title === props.selectedCourse.title
  return active ? 'summary-item--active' : 'summary-item--default'
}

const onSelect = (item) => emit('select', item)
</script>

<template>
  <div
    class="summary-panel flex h-full flex-col gap-4 rounded-2xl border p-5"
    :class="isLight ? 'border-slate-200 bg-white' : 'border-slate-700/50 bg-slate-800/50'"
  >
    <div class="flex items-center justify-between gap-2">
      <div>
        <p class="text-xs uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
          {{ t('education.summary') }}
        </p>
        <p class="text-sm font-semibold" :class="isLight ? 'text-slate-600' : 'text-slate-200'">
          {{ t('education.nodeSelection') }}
        </p>
      </div>
      <span
        class="text-xs font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full"
        :class="isLight ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent-dark)]' : 'bg-[var(--color-accent-soft)] text-[var(--color-accent-light)]'"
      >
        {{ courses.length }} {{ t('education.coursesLabel') }}
      </span>
    </div>

    <div class="flex items-center gap-2 text-xs" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
      <span class="block h-0.5 w-8 rounded-full bg-[var(--color-accent)]" />
      <span class="leading-tight">{{ t('education.hint') }}</span>
    </div>

    <div class="flex flex-col gap-2 overflow-y-auto max-h-[360px] pr-1">
      <button
        v-for="item in courses"
        :key="'list-' + item.title"
        class="flex items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-150"
        :class="[
          getCourseListClass(item),
          isLight
            ? getCourseListClass(item) === 'summary-item--active'
              ? 'bg-[var(--color-accent-softer)] ring-1 ring-[var(--color-accent)]/30'
              : 'bg-slate-50 hover:bg-slate-100'
            : getCourseListClass(item) === 'summary-item--active'
              ? 'bg-[var(--color-accent-soft)] ring-1 ring-[var(--color-accent)]/30'
              : 'bg-slate-900/40 hover:bg-slate-900/60'
        ]"
        @click="onSelect(item)"
      >
        <span class="text-sm font-semibold leading-tight line-clamp-1" :class="isLight ? 'text-slate-600' : 'text-slate-200'">
          {{ item.title }}
        </span>
        <span
          class="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2 bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
        >
          {{ item.period }}
        </span>
      </button>
    </div>

    <Transition name="detail">
      <div
        v-if="selectedCourse"
        :key="selectedCourse.title"
        class="flex flex-col gap-2 mt-1 rounded-xl border p-4"
        :class="isLight ? 'border-slate-200 bg-slate-50' : 'border-slate-700/50 bg-slate-900/40'"
      >
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-academic-cap-20-solid" class="w-4 h-4 text-[var(--color-accent)]" />
          <span class="text-xs font-semibold uppercase tracking-wide text-[var(--color-accent)]">
            {{ t('education.certificate') }}
          </span>
        </div>
        <div class="flex items-center justify-between text-xs font-semibold uppercase tracking-wide">
          <span class="text-[var(--color-accent)]">{{ selectedCourse.period }}</span>
          <span class="text-xs" :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ selectedCourse.place }}</span>
        </div>
        <p class="text-sm font-semibold leading-snug" :class="isLight ? 'text-slate-600' : 'text-slate-200'">{{ selectedCourse.title }}</p>
        <p class="text-xs leading-snug" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ selectedCourse.detail }}</p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.detail-enter-active {
  transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.detail-leave-active {
  transition: all 0.15s ease;
}
.detail-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.detail-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
