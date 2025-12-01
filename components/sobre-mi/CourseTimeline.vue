<script setup>
import { computed } from 'vue'
import GlowCard from '~/components/GlowCard.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false },
  courses: { type: Array, default: () => [] },
  selectedCourse: { type: Object, default: null },
  cardWidth: { type: String, default: 'clamp(190px, 16vw, 230px)' }
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
  const alignPattern = ['up', 'right', 'down', 'left']
  const offsetMap = {
    up: { dx: 0, dy: -16 },
    down: { dx: 0, dy: 16 },
    left: { dx: -16, dy: -4 },
    right: { dx: 16, dy: -4 }
  }

  const basePoints = items.map((item, index) => {
    const t = total === 1 ? 0.5 : index / (total - 1)
    const nodeY = startY + (endY - startY) * t
    const waveX = Math.sin((t - 0.5) * Math.PI * turns)
    const nodeX = xCenter + waveX * amplitudeX
    const align = alignPattern[index % alignPattern.length]
    const offset = offsetMap[align] || offsetMap.up
    const cardX = clamp(nodeX + offset.dx, 8, 92)
    const cardY = clamp(nodeY + offset.dy, 8, 92)

    return {
      ...item,
      x: Number(nodeX.toFixed(2)),
      y: Number(nodeY.toFixed(2)),
      cardX: Number(cardX.toFixed(2)),
      cardY: Number(cardY.toFixed(2)),
      align
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
    rounded="rounded-[34px]"
    :overflow-visible="true"
    body-padding="px-0 py-0"
    body-class="relative overflow-visible bg-transparent"
    card-class="bg-transparent"
  >
    <div class="relative overflow-hidden rounded-[32px] border border-white/5">
      <div class="relative min-h-[640px] px-4 sm:px-8 pt-12 pb-16">
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
            stroke-width="2.2"
            opacity="0.38"
            :stroke="baseColor"
            :style="{ filter: dropShadow }"
          />
          <path
            :d="coursesTimeline.path"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.7"
            filter="url(#timeline-glow-course)"
            :stroke="`url(#course-gradient-${isLight ? 'light' : 'dark'})`"
            stroke-opacity="0.9"
          />

          <g v-for="point in coursesTimeline.points" :key="`course-connector-${point.title}`">
            <line
              :x1="point.x"
              :y1="point.y"
              :x2="point.cardX"
              :y2="point.cardY"
              stroke-linecap="round"
              stroke-width="0.85"
              :stroke="baseColor"
              stroke-opacity="0.65"
            />
          </g>

          <g v-for="point in coursesTimeline.points" :key="`course-node-${point.title}`" :style="{ filter: dropShadow }">
            <circle :cx="point.x" :cy="point.y" r="4.8" :fill="baseColor" opacity="0.22" filter="url(#node-glow-course)" />
            <circle :cx="point.x" :cy="point.y" r="3.2" fill="#0c0c0d" :stroke="baseColor" stroke-width="1.4" filter="url(#node-glow-course)" />
            <circle :cx="point.x" :cy="point.y" r="1.5" :fill="accentColor" />
          </g>
        </svg>

        <div
          v-for="(item, idx) in coursesTimeline.points"
          :key="item.title"
          class="absolute z-10 flex max-w-[250px] min-h-[132px] flex-col gap-2 rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-300 cursor-pointer"
          :style="{
            left: `${item.cardX}%`,
            top: `${item.cardY}%`,
            width: cardWidth,
            transform: 'translate(-50%, -50%)'
          }"
          :class="[
            isLight
              ? 'border-white/70 bg-white/97 shadow-emerald-200/70 hover:shadow-emerald-300/80'
              : 'border-white/12 bg-[#08090f]/92 backdrop-blur-xl shadow-[0_18px_60px_-26px_rgba(0,0,0,0.9)] hover:shadow-red-400/40',
            selectedCourse?.title === item.title
              ? isLight
                ? 'ring-2 ring-emerald-400/80 scale-[1.03]'
                : 'ring-2 ring-red-400/80 scale-[1.03]'
              : 'ring-1 ring-white/5 hover:scale-[1.045]'
         ]"
          @click="onSelect(item)"
        >
          <div class="flex items-center justify-between gap-3">
            <span
              class="text-[11px] font-semibold uppercase tracking-wide"
              :class="isLight ? 'text-emerald-700' : 'text-red-300'"
            >
              {{ idx + 1 < 10 ? `0${idx + 1}` : idx + 1 }}
            </span>
            <span
              class="rounded-full px-2 py-0.5 text-[11px] font-semibold"
              :class="isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-red-500/25 text-red-100'"
            >
              {{ item.period }}
            </span>
          </div>

          <p
            class="mt-0.5 text-[13px] font-semibold leading-snug line-clamp-2"
            :class="isLight ? 'text-slate-900' : 'text-white'"
          >
            {{ item.title }}
          </p>
          <p
            v-if="item.place"
            class="text-[11px] uppercase tracking-[0.08em] font-semibold"
            :class="isLight ? 'text-emerald-700' : 'text-red-200'"
          >
            {{ item.place }}
          </p>
        </div>
      </div>
    </div>
  </GlowCard>
</template>
