<script setup lang="ts">
import WallTag from './WallTag.vue'
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'

const props = defineProps<{
  isLight: boolean
  courses: Array<{ title: string; period: string; place?: string; detail?: string }>
  selectedCourse: { title: string } | null
}>()

const emit = defineEmits<{
  select: [course: any]
}>()

const onSelect = (course: any) => emit('select', course)

const getAlignment = (index: number) => {
  return index % 2 === 0 ? 'self-start' : 'self-end'
}

const getOffset = (index: number) => {
  const offsets = ['ml-0', 'ml-4 sm:ml-16', 'ml-1', 'ml-6 sm:ml-24', 'ml-2', 'ml-5 sm:ml-20', 'ml-1', 'ml-3 sm:ml-14']
  return offsets[index % offsets.length]
}

const sprayColors = ['var(--spray-red)', 'var(--spray-cyan)', 'var(--spray-yellow)', 'var(--spray-pink)', 'var(--spray-orange)']
const getSprayColor = (idx: number) => sprayColors[idx % sprayColors.length]
</script>

<template>
  <div class="graffiti-wall relative overflow-hidden">

    <!-- Spray decorations — more of them for raw feel -->
    <SpraySplatter class="absolute top-6 right-6" size="lg" :opacity="0.08" />
    <SpraySplatter class="absolute bottom-10 left-4" size="md" :opacity="0.06" />
    <SpraySplatter class="absolute top-1/3 left-1/4" size="sm" :opacity="0.04" />
    <SpraySplatter class="absolute bottom-1/4 right-1/3" size="sm" :opacity="0.05" color="var(--spray-cyan)" />

    <!-- Spray paint line — raw vertical stroke -->
    <div class="graffiti-wall__line" aria-hidden="true" />
    <div class="graffiti-wall__line graffiti-wall__line--secondary" aria-hidden="true" />

    <!-- Paint drips from top -->
    <PaintDrip class="absolute top-0 left-[15%]" :count="2" color="var(--spray-cyan)" :animated="true" />
    <PaintDrip class="absolute top-0 right-[20%]" :count="1" color="var(--spray-yellow)" :animated="true" />

    <!-- Random spray text marks -->
    <span class="absolute top-8 right-12 font-marker text-[0.5rem] tracking-widest opacity-10 text-[var(--spray-cyan)]" aria-hidden="true" style="transform: rotate(12deg)">
      KEEP CODING
    </span>
    <span class="absolute bottom-20 left-8 font-marker text-[0.5rem] tracking-widest opacity-10 text-[var(--spray-pink)]" aria-hidden="true" style="transform: rotate(-8deg)">
      NO SLEEP
    </span>

    <!-- Tags on the wall -->
    <div role="list" aria-label="Cursos y certificaciones" class="relative flex flex-col gap-8 sm:gap-10 p-6 sm:p-10 lg:p-12">
      <div
        v-for="(course, idx) in courses"
        :key="course.title"
        role="listitem"
        class="flex relative z-10"
        :class="[getAlignment(idx), getOffset(idx)]"
      >
        <WallTag
          :course="course"
          :index="idx"
          :is-selected="selectedCourse?.title === course.title"
          :is-light="isLight"
          @select="onSelect(course)"
        />
      </div>
    </div>

    <!-- Bottom graffiti mark -->
    <div class="absolute bottom-3 right-5 font-marker text-xs tracking-wide opacity-20 text-[var(--color-accent)]" aria-hidden="true">
      JMRS &copy; {{ new Date().getFullYear() }}
    </div>

    <!-- Cross-out X mark decoration -->
    <svg class="absolute bottom-8 left-8 w-12 h-12 opacity-[0.07]" viewBox="0 0 40 40" aria-hidden="true">
      <line x1="5" y1="5" x2="35" y2="35" stroke="var(--spray-orange)" stroke-width="4" stroke-linecap="round" />
      <line x1="35" y1="5" x2="5" y2="35" stroke="var(--spray-orange)" stroke-width="4" stroke-linecap="round" />
    </svg>
  </div>
</template>

<style scoped>
.graffiti-wall {
  position: relative;
  min-height: 400px;
  border: none;
}

/* Primary spray line — raw, broken stroke */
.graffiti-wall__line {
  position: absolute;
  top: 1.5rem;
  bottom: 1.5rem;
  left: 2rem;
  width: 3px;
  background: repeating-linear-gradient(
    180deg,
    var(--color-accent) 0px,
    var(--color-accent) 12px,
    transparent 12px,
    transparent 18px,
    var(--color-accent) 18px,
    var(--color-accent) 35px,
    transparent 35px,
    transparent 40px
  );
  opacity: 0.25;
  border-radius: 2px;
  filter: blur(0.5px);
}

/* Secondary thinner line offset */
.graffiti-wall__line--secondary {
  left: 2.5rem;
  width: 1px;
  opacity: 0.12;
  background: repeating-linear-gradient(
    180deg,
    transparent 0px,
    transparent 20px,
    var(--spray-cyan) 20px,
    var(--spray-cyan) 45px,
    transparent 45px,
    transparent 60px
  );
}

@media (min-width: 640px) {
  .graffiti-wall__line {
    left: 3rem;
  }
  .graffiti-wall__line--secondary {
    left: 3.6rem;
  }
}
</style>
