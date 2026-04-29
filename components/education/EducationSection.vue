<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import GraffitiWall from './GraffitiWall.vue'
import GraffitiTag from '~/components/graffiti/GraffitiTag.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { useTextSplit } from '~/composables/useTextSplit'

const props = defineProps({
  isLight: { type: Boolean, default: false },
  education: { type: Array, default: () => [] },
  courses: { type: Array, default: () => [] }
})

const { t } = useI18n()
const displayedCourses = computed(() => props.courses || [])
const selectedCourse = ref(null)

watch(
  displayedCourses,
  value => {
    if (value.length && !selectedCourse.value) selectedCourse.value = value[0]
  },
  { immediate: true }
)

const selectCourse = (item) => {
  selectedCourse.value = item
}

const flyerRotation = (idx: number) => {
  const angles = [-1.5, 1.2, -0.8, 1.8, -1]
  return angles[idx % angles.length]
}

useScrollAnimation('.edu-animate-trigger', {
  animation: {
    translateY: [40, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200
  },
  stagger: 150
})

useTextSplit('.split-text-wall', { stagger: 30 })
</script>

<template>
  <UContainer as="section" id="educacion" class="py-14 sm:py-20">
    <div class="space-y-10">
      <!-- Header -->
      <div class="flex flex-wrap items-end justify-between gap-4 edu-animate-trigger animate-group">
        <div class="relative animate-item opacity-0">
          <span
            class="tag-sticker text-xs uppercase tracking-widest mb-3 inline-block"
            style="transform: rotate(-2deg)"
          >
            {{ t('education.sectionTitle') }}
          </span>
          <h2 class="text-3xl font-bold text-spray sm:text-4xl lg:text-5xl text-balance" :class="isLight ? 'text-slate-700' : 'text-white'">
            {{ t('education.headline') }}
          </h2>
          <PaintDrip class="absolute -bottom-3 left-8" :count="2" :animated="true" />
        </div>
        <GraffitiTag class="animate-item opacity-0" :text="t('education.interact')" :index="3" size="sm" />
      </div>

      <!-- Formación formal — flyers pegados directo en el muro -->
      <div v-if="education.length" class="edu-wall relative overflow-hidden edu-animate-trigger animate-group">
        <div class="relative z-10 p-6 sm:p-8">
          <span
            class="tag-sticker text-xs uppercase tracking-widest mb-6 inline-block animate-item opacity-0"
            style="transform: rotate(1.5deg)"
          >
            {{ t('education.educationTitle') }}
          </span>

          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            <div
              v-for="(item, idx) in education"
              :key="item.title"
              class="edu-flyer group relative animate-item opacity-0"
              :style="{ transform: `rotate(${flyerRotation(idx)}deg)`, animationDelay: `${idx * 0.08}s` }"
            >
              <!-- Pin -->
              <div class="edu-flyer__pin" aria-hidden="true" />

              <!-- Period tape -->
              <span class="edu-flyer__tape font-marker">
                {{ item.period }}
              </span>

              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-heroicons-academic-cap-20-solid" class="w-4 h-4 text-[var(--color-accent)]" />
                <span class="text-[0.65rem] font-bold uppercase tracking-wider text-[var(--color-accent)]">
                  {{ item.place }}
                </span>
              </div>

              <p class="text-sm font-bold leading-snug" :class="isLight ? 'text-slate-600' : 'text-slate-200'">
                {{ item.title }}
              </p>

              <p
                v-if="item.detail"
                class="text-xs mt-2 leading-relaxed border-t border-dashed pt-2"
                :class="isLight ? 'text-slate-500 border-slate-200' : 'text-slate-400 border-slate-700'"
                style="letter-spacing: 0.03em"
              >
                {{ item.detail }}
              </p>

              <!-- Spray accent on hover -->
              <div class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-10 blur-md transition-opacity" />
            </div>
          </div>
        </div>
      </div>

      <!-- Graffiti Wall — Cursos -->
      <GraffitiWall
        :is-light="isLight"
        :courses="displayedCourses"
        :selected-course="selectedCourse"
        @select="selectCourse"
      />
    </div>
  </UContainer>
</template>

<style scoped>
/* Education wall container — no bg, flyers sit on the page wall */
.edu-wall {
  border: none;
}

/* Education flyer card */
.edu-flyer {
  padding: 1.25rem 1.25rem 1.25rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 3px 10px 5px 8px;
  background: var(--color-surface-card);
  backdrop-filter: blur(8px);
  transition: all 0.3s var(--ease-spring);
  cursor: default;
}

.edu-flyer:hover {
  transform: rotate(0deg) scale(1.03) !important;
  border-color: var(--color-accent);
  box-shadow: var(--shadow-neon);
}

/* Pin on flyer */
.edu-flyer__pin {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 2px 4px rgba(0,0,0,0.3), inset 0 -2px 3px rgba(0,0,0,0.2);
}

/* Period tape on flyer */
.edu-flyer__tape {
  position: absolute;
  top: -1px;
  right: 0.75rem;
  background: var(--color-accent);
  color: white;
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  padding: 2px 8px;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 2px 3px rgba(0,0,0,0.2);
  transform: rotate(1deg);
}
</style>
