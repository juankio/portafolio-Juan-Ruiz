<script setup>
import { computed } from 'vue'
import GlowCard from '~/components/GlowCard.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false },
  education: { type: Array, default: () => [] },
  courses: { type: Array, default: () => [] }
})

const cardWidth = 'clamp(180px, 18vw, 220px)'

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

// ===== Cursos: S VERTICAL EXÓTICA, usando todo el GlowCard =====
const buildBranchTimeline = (items) => {
  if (!items.length) return { points: [], path: '' }

  const total = items.length

  // usa casi todo el alto
  const startY = 16
  const endY = 88

  // centro + amplitud fuerte para ir casi de borde a borde
  const xCenter = 50
  const amplitude = 34 // 50 ± 34 -> ~16% a ~84%
  const turns = total <= 3 ? 1.1 : total <= 5 ? 1.7 : 2.5

  const points = items.map((item, index) => {
    const t = total === 1 ? 0.5 : index / (total - 1)

    const y = startY + (endY - startY) * t
    const wave = Math.sin((t - 0.5) * Math.PI * turns)
    const x = xCenter + wave * amplitude

    const align = wave > 0 ? 'up' : 'down'

    return {
      ...item,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      align
    }
  })

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

const baseColor = computed(() => (props.isLight ? '#10b981' : '#ef4444'))
const accentColor = computed(() => (props.isLight ? '#34d399' : '#f87171'))
const dropShadow = computed(() =>
  props.isLight ? 'drop-shadow(0 0 28px rgba(16,185,129,0.25))' : 'drop-shadow(0 0 28px rgba(239,68,68,0.28))'
)
</script>

<template>
  <UContainer as="section" id="educacion" class="py-12 sm:py-16">
    <div class="flex flex-col gap-16">
      <!-- EDUCACIÓN PRINCIPAL (apagada por ahora) -->
      <section v-if="false" class="relative space-y-8 sm:space-y-10 w-full">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-academic-cap-20-solid" :class="isLight ? 'text-emerald-600' : 'text-red-500'" />
          <div>
            <p class="text-sm uppercase tracking-[0.22em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Educacion</p>
            <h3 class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">Formacion principal</h3>
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

            <div
              v-for="(item, idx) in educationTimeline.points"
              :key="item.title"
              class="absolute z-10 flex flex-col gap-1 rounded-2xl border px-3 py-3 shadow-lg backdrop-blur-md transition-all duration-300"
              :style="{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: cardWidth,
                transform: item.align === 'up' ? 'translate(-50%, -180%)' : 'translate(-50%, 58%)'
              }"
              :class="isLight ? 'border-white/80 bg-white/95 shadow-emerald-100/60 hover:shadow-emerald-200/80' : 'border-white/10 bg-black/75 shadow-red-500/30 hover:shadow-red-400/40'"
            >
              <span
                class="pointer-events-none absolute left-1/2 w-px"
                :class="item.align === 'up' ? 'bottom-[-24px]' : 'top-[-24px]'"
                :style="{
                  height: item.align === 'up' ? '30px' : '22px',
                  transform: 'translateX(-50%)',
                  background: item.align === 'up'
                    ? (isLight ? 'linear-gradient(180deg, rgba(16,185,129,0.55), transparent)' : 'linear-gradient(180deg, rgba(248,113,113,0.65), transparent)')
                    : (isLight ? 'linear-gradient(0deg, rgba(16,185,129,0.55), transparent)' : 'linear-gradient(0deg, rgba(248,113,113,0.65), transparent)')
                }"
              />

              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold uppercase tracking-wide" :class="isLight ? 'text-emerald-700' : 'text-red-300'">
                  {{ idx + 1 < 10 ? `0${idx + 1}` : idx + 1 }}
                </span>
                <span class="rounded-full px-2 py-0.5 text-[11px] font-medium" :class="isLight ? 'bg-emerald-100 text-emerald-700' : 'bg-red-500/15 text-red-200'">
                  {{ item.period }}
                </span>
              </div>
              <p class="text-base font-semibold leading-tight" :class="isLight ? 'text-slate-900' : 'text-white'">{{ item.title }}</p>
              <p class="text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-300'">{{ item.place }}</p>
              <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ item.detail }}</p>
            </div>
          </div>
        </GlowCard>
      </section>

      <!-- CURSOS Y CERTIFICACIONES -->
      <section class="relative space-y-8 sm:space-y-10 w-full">
        <div class="flex items-center gap-3">
          <UIcon name="i-heroicons-sparkles-20-solid" :class="isLight ? 'text-emerald-600' : 'text-red-500'" />
          <div>
            <p class="text-sm uppercase tracking-[0.22em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Cursos y certificaciones</p>
            <h3 class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">Actualizaciones constantes</h3>
          </div>
        </div>

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
          <div class="relative w-full h-full min-h-[600px] sm:min-h-[640px] pt-10 pb-10">
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
                stroke-width="1.8"
                filter="url(#timeline-glow-course)"
                :stroke="`url(#course-gradient-${isLight ? 'light' : 'dark'})`"
                stroke-opacity="0.8"
              />

              <g v-for="point in coursesTimeline.points" :key="`course-node-${point.title}`" :style="{ filter: dropShadow }">
                <circle :cx="point.x" :cy="point.y" r="4.8" :fill="baseColor" opacity="0.2" filter="url(#node-glow-course)" />
                <circle :cx="point.x" :cy="point.y" r="3" fill="#0c0c0d" :stroke="baseColor" stroke-width="1.3" filter="url(#node-glow-course)" />
                <circle :cx="point.x" :cy="point.y" r="1.4" :fill="accentColor" />
              </g>
            </svg>

            <div
              v-for="(item, idx) in coursesTimeline.points"
              :key="item.title"
              class="absolute z-10 flex max-w-[260px] flex-col gap-1 rounded-2xl border px-3 py-3 shadow-lg backdrop-blur-md transition-all duration-300"
              :style="{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: cardWidth,
                // alejadas de la línea para que el glow se vea
                transform: item.align === 'up'
                  ? 'translate(-50%, -140%)'
                  : 'translate(-50%, 90%)'
              }"
              :class="isLight ? 'border-white/80 bg-white/95 shadow-emerald-100/60 hover:shadow-emerald-200/80' : 'border-white/10 bg-black/75 shadow-red-500/30 hover:shadow-red-400/40'"
            >
              <span
                class="pointer-events-none absolute left-1/2 w-px"
                :class="item.align === 'up' ? 'bottom-[-32px]' : 'top-[-32px]'"
                :style="{
                  height: '32px',
                  transform: 'translateX(-50%)',
                  background: item.align === 'up'
                    ? (isLight ? 'linear-gradient(180deg, rgba(16,185,129,0.55), transparent)' : 'linear-gradient(180deg, rgba(248,113,113,0.65), transparent)')
                    : (isLight ? 'linear-gradient(0deg, rgba(16,185,129,0.55), transparent)' : 'linear-gradient(0deg, rgba(248,113,113,0.65), transparent)')
                }"
              />

              <div class="flex items-center justify-between gap-2">
                <span class="text-xs font-semibold uppercase tracking-wide" :class="isLight ? 'text-emerald-700' : 'text-red-300'">
                  {{ idx + 1 < 10 ? `0${idx + 1}` : idx + 1 }}
                </span>
                <span class="rounded-full px-2 py-0.5 text-[11px] font-medium" :class="isLight ? 'bg-emerald-100 text-emerald-700' : 'bg-red-500/15 text-red-200'">
                  {{ item.period }}
                </span>
              </div>
              <p class="text-base font-semibold leading-tight" :class="isLight ? 'text-slate-900' : 'text-white'">{{ item.title }}</p>
              <p class="text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-300'">{{ item.place }}</p>
              <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ item.detail }}</p>
            </div>
          </div>
        </GlowCard>
      </section>
    </div>
  </UContainer>
</template>
