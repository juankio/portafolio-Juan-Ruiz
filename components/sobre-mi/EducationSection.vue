<script setup>
import { computed, ref, watch } from 'vue'
import GlowCard from '~/components/GlowCard.vue'
import CourseTimeline from './CourseTimeline.vue'
import CourseSummary from './CourseSummary.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false },
  education: { type: Array, default: () => [] },
  courses: { type: Array, default: () => [] }
})

const displayedCourses = computed(() => props.courses || [])
const selectedCourse = ref(null)

const baseColor = computed(() => (props.isLight ? '#10b981' : '#ef4444'))
const accentColor = computed(() => (props.isLight ? '#34d399' : '#f87171'))
const dropShadow = computed(() =>
  props.isLight ? 'drop-shadow(0 0 28px rgba(16,185,129,0.25))' : 'drop-shadow(0 0 28px rgba(239,68,68,0.28))'
)

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

const buildTimeline = (items) => {
  const total = items.length || 1
  const startX = total === 1 ? 50 : 2
  const endX = total === 1 ? 50 : 98
  const span = Math.max(0.1, endX - startX)

  const amplitude = total > 10 ? 12 : total > 6 ? 14 : 16
  const yBase = 52
  const waves = total > 8 ? 2 : total > 5 ? 1.6 : 1.2

  const points = items.map((item, index) => {
    const step = total === 1 ? 0 : span / (total - 1)
    const x = total === 1 ? 50 : startX + step * index
    const t = total === 1 ? 0 : index / (total - 1)
    const baseWave = Math.sin(t * Math.PI * waves) * 0.9
    const detailWave = Math.sin(t * Math.PI * (waves + 0.6) + 0.35) * 0.18
    const taper = Math.max(0.75, 1 - Math.abs(t - 0.5) * 0.25)
    let wave = (baseWave + detailWave) * taper
    if (Math.abs(wave) < 0.1) wave = index % 2 === 0 ? -0.24 : 0.24
    const y = yBase + wave * amplitude
    const align = wave >= 0 ? 'up' : 'down'
    return { ...item, x: Number(x.toFixed(2)), y: Number(y.toFixed(2)), align }
  })

  const path = points.reduce((acc, point, idx) => {
    if (idx === 0) return `M ${point.x} ${point.y}`
    const prev = points[idx - 1]
    const deltaX = point.x - prev.x
    const cp1x = prev.x + deltaX / 3
    const cp2x = prev.x + (deltaX * 2) / 3
    const cp1y = prev.y
    const cp2y = point.y
    return `${acc} C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${point.x} ${point.y}`
  }, '')

  return { points, path }
}

const educationTimeline = computed(() => buildTimeline(props.education))
</script>

<template>
  <UContainer as="section" id="educacion" class="py-12 sm:py-16">
    <div class="flex flex-col gap-16">
      <!-- EDUCACION PRINCIPAL (apagada) -->
      <section v-if="false" class="relative space-y-8 sm:space-y-10 w-full">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-academic-cap-20-solid" :class="isLight ? 'text-emerald-600' : 'text-red-500'" />
          <div>
            <p class="text-sm uppercase tracking-[0.22em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
              Educacion
            </p>
            <h3 class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">
              Formacion principal
            </h3>
          </div>
        </div>

        <GlowCard
          :is-light="isLight"
          :motion="false"
          :glow="false"
          rounded="rounded-[34px]"
          :overflow-visible="true"
          class="mt-8 sm:mt-10"
          body-padding="px-0 py-0"
          body-class="relative overflow-visible px-4 sm:px-6 pt-12 pb-12 bg-transparent"
          card-class="bg-transparent"
        >
          <div class="relative w-full h-[620px] sm:h-[700px]">
            <svg class="pointer-events-none absolute inset-0 h-full w-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient :id="`edu-gradient-${isLight ? 'light' : 'dark'}`" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" :stop-color="baseColor" />
                  <stop offset="100%" :stop-color="accentColor" />
                </linearGradient>
                <filter id="timeline-glow-edu" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="1.2" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="node-glow-edu" x="-200%" y="-200%" width="400%" height="400%" filterUnits="userSpaceOnUse">
                  <feGaussianBlur stdDeviation="1.6" result="nshadow" />
                  <feMerge>
                    <feMergeNode in="nshadow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                :d="educationTimeline.path"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.2"
                opacity="0.38"
                :stroke="baseColor"
                :style="{ filter: dropShadow }"
              />
              <path
                :d="educationTimeline.path"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.8"
                filter="url(#timeline-glow-edu)"
                :stroke="`url(#edu-gradient-${isLight ? 'light' : 'dark'})`"
                stroke-opacity="0.8"
              />

              <g v-for="point in educationTimeline.points" :key="`edu-node-${point.title}`" :style="{ filter: dropShadow }">
                <circle :cx="point.x" :cy="point.y" r="4.8" :fill="baseColor" opacity="0.2" filter="url(#node-glow-edu)" />
                <circle :cx="point.x" :cy="point.y" r="3" fill="#0c0c0d" :stroke="baseColor" stroke-width="1.3" filter="url(#node-glow-edu)" />
                <circle :cx="point.x" :cy="point.y" r="1.4" :fill="accentColor" />
              </g>
            </svg>
          </div>
        </GlowCard>
      </section>

      <!-- CURSOS Y CERTIFICACIONES -->
      <section class="relative space-y-8 sm:space-y-10 w-full">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <UIcon name="i-heroicons-sparkles-20-solid" :class="isLight ? 'text-emerald-600' : 'text-red-500'" />
            <div>
              <p class="text-sm uppercase tracking-[0.22em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
                Cursos y certificaciones
              </p>
              <h3 class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">
                Actualizaciones constantes
              </h3>
            </div>
          </div>

          <div class="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em]" :class="isLight ? 'text-emerald-700' : 'text-red-200'">
            <span class="rounded-full px-3 py-1 font-semibold" :class="isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-red-500/20 text-red-100'">
              Interactua
            </span>
            <span :class="isLight ? 'text-slate-500' : 'text-slate-300'">Explora la ruta y toca para ver detalle</span>
          </div>
        </div>

        <div class="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_320px] items-start">
          <CourseTimeline
            :is-light="isLight"
            :courses="displayedCourses"
            :selected-course="selectedCourse"
            @select="selectCourse"
          />

          <CourseSummary
            :is-light="isLight"
            :courses="displayedCourses"
            :selected-course="selectedCourse"
            @select="selectCourse"
          />
        </div>
      </section>
    </div>
  </UContainer>
</template>
