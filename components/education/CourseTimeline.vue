<script setup>
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
import { computed } from 'vue'
import GlowCard from '~/components/ui/GlowCard.vue'
import CourseCard3D from './CourseCard3D.vue'

const props = defineProps({
  
  courses: { type: Array, default: () => [] },
  selectedCourse: { type: Object, default: null },
  cardWidth: { type: String, default: 'clamp(180px, 16vw, 220px)' }
})

const emit = defineEmits(['select'])

const baseColor = computed(() => (props.isLight ? '#10b981' : '#ef4444'))
const accentColor = computed(() => (props.isLight ? '#34d399' : '#f87171'))
const dropShadow = computed(() =>
  props.isLight ? 'drop-shadow(0 0 28px rgba(16,185,129,0.25))' : 'drop-shadow(0 0 28px rgba(239,68,68,0.28))'
)

const buildBranchTimeline = (items) => {
  if (!items.length) return { points: [], path: '' }

  const total = items.length
  const startY = 22
  const endY = 78
  const xCenter = 50
  const amplitudeX = 28
  const turns = total <= 3 ? 1.1 : total <= 5 ? 1.7 : 2.3

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
  const offsetPattern = [
    { dx: -26, dy: -22 },
    { dx: 26, dy: 22 },
    { dx: -30, dy: 24 },
    { dx: 30, dy: -24 },
    { dx: -32, dy: 20 },
    { dx: 32, dy: -20 },
    { dx: -24, dy: 28 },
    { dx: 24, dy: -28 }
  ]

  const basePoints = items.map((item, index) => {
    const t = total === 1 ? 0.5 : index / (total - 1)
    const nodeY = startY + (endY - startY) * t
    const waveX = Math.sin((t - 0.5) * Math.PI * turns)
    const nodeX = xCenter + waveX * amplitudeX
    const offset = offsetPattern[index % offsetPattern.length]
    const jitterX = ((index % 2 === 0 ? 1 : -1) * 4)
    const jitterY = ((index % 3 === 0 ? 1 : -1) * 3)

    const cardX = clamp(nodeX + offset.dx + jitterX, 6, 94)
    const cardY = clamp(nodeY + offset.dy + jitterY, 6, 94)

    return {
      ...item,
      x: Number(nodeX.toFixed(2)),
      y: Number(nodeY.toFixed(2)),
      cardX: Number(cardX.toFixed(2)),
      cardY: Number(cardY.toFixed(2))
    }
  })

  const points = basePoints.map(p => ({ ...p, angle: 0 }))

  const path = points.reduce((acc, p, idx) => {
    if (idx === 0) return `M ${p.x} ${p.y}`
    const prev = points[idx - 1]
    const deltaY = p.y - prev.y
    const cp1y = prev.y + deltaY / 3
    const cp2y = prev.y + (deltaY * 2) / 3
    return `${acc} C ${prev.x} ${cp1y} ${p.x} ${cp2y} ${p.x} ${p.y}`
  }, '')

  return { points, path }
}

const coursesTimeline = computed(() => buildBranchTimeline(props.courses))

const onSelect = (item) => emit('select', item)
</script>

<template>
  <GlowCard
    :is-light="isLight"
    :motion="false"
    :glow="false"
    rounded="rounded-3xl"
    :overflow-visible="true"
    body-padding="px-0 py-0"
    body-class="relative overflow-visible bg-transparent"
    card-class="bg-transparent"
  >
    <div class="relative overflow-hidden rounded-3xl border border-white/5">
      <div class="relative h-[70vh] min-h-[560px] max-h-[82vh] px-3 sm:px-6 pt-8 pb-12 sm:pt-10 sm:pb-14">
        <div class="relative h-full w-full origin-top transform-gpu scale-[0.78] sm:scale-[0.8] lg:scale-[0.82]">
          <svg class="pointer-events-none absolute inset-0 h-full w-full z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient :id="`course-gradient-${isLight ? 'light' : 'dark'}`" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" :stop-color="baseColor" />
                <stop offset="100%" :stop-color="accentColor" />
              </linearGradient>
              <filter id="timeline-glow-course" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="1.2" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="node-glow-course" x="-200%" y="-200%" width="400%" height="400%" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="1.6" result="nshadow" />
                <feMerge>
                  <feMergeNode in="nshadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <path
              :d="coursesTimeline.path"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.8"
              opacity="0.6"
              :stroke="baseColor"
              :style="{ filter: dropShadow }"
            />
            <path
              :d="coursesTimeline.path"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.15"
              filter="url(#timeline-glow-course)"
              :stroke="`url(#course-gradient-${isLight ? 'light' : 'dark'})`"
              stroke-opacity="0.95"
            />

            <g v-for="point in coursesTimeline.points" :key="`course-connector-${point.title}`">
              <line
                :x1="point.x"
                :y1="point.y"
                :x2="point.cardX"
                :y2="point.cardY"
                stroke-linecap="round"
                stroke-width="1"
                :stroke="baseColor"
                stroke-opacity="0.85"
              />
            </g>

            <g v-for="point in coursesTimeline.points" :key="`course-node-${point.title}`" :style="{ filter: dropShadow }">
              <circle :cx="point.x" :cy="point.y" r="5.4" :fill="baseColor" opacity="0.28" filter="url(#node-glow-course)" />
              <circle :cx="point.x" :cy="point.y" r="3.6" fill="#0c0c0d" :stroke="baseColor" stroke-width="1.6" filter="url(#node-glow-course)" />
              <circle :cx="point.x" :cy="point.y" r="1.9" :fill="accentColor" />
            </g>
          </svg>

          <div
            v-for="(item, idx) in coursesTimeline.points"
            :key="item.title"
            class="absolute z-10"
            :style="{
              left: `${item.cardX}%`,
              top: `${item.cardY}%`,
              width: cardWidth,
              transform: 'translate(-50%, -50%)'
            }"
          >
            <CourseCard3D
              :course="item"
              :index="idx"
              :is-selected="selectedCourse?.title === item.title"
              :is-light="isLight"
              @select="onSelect(item)"
            />
          </div>
        </div>
      </div>
    </div>
  </GlowCard>
</template>
