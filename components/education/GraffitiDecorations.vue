<script setup lang="ts">
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
</script>

<template>
  <!-- Spray decorations -->
  <SpraySplatter class="absolute top-6 right-6 pointer-events-none" size="lg" :opacity="0.08" />
  <SpraySplatter class="absolute bottom-10 left-4 pointer-events-none" size="md" :opacity="0.06" />
  <SpraySplatter class="absolute top-1/3 right-1/4 pointer-events-none" size="sm" :opacity="0.04" color="var(--spray-cyan)" />

  <!-- Paint drips from top -->
  <PaintDrip class="absolute top-0 left-[10%] pointer-events-none" :count="2" color="var(--spray-cyan)" :animated="true" />
  <PaintDrip class="absolute top-0 right-[15%] pointer-events-none" :count="1" color="var(--spray-yellow)" :animated="true" />

  <!-- Random spray text marks -->
  <span class="absolute top-8 right-12 font-marker text-[0.5rem] tracking-widest opacity-10 text-[var(--spray-cyan)]" aria-hidden="true" style="transform: rotate(12deg)">
    KEEP CODING
  </span>
  <span class="absolute bottom-20 left-8 font-marker text-[0.5rem] tracking-widest opacity-10 text-[var(--spray-pink)]" aria-hidden="true" style="transform: rotate(-8deg)">
    NO SLEEP
  </span>

  <!-- Bottom graffiti mark -->
  <div class="absolute bottom-3 right-5 font-marker text-xs tracking-wide opacity-20 text-[var(--color-accent)]" aria-hidden="true">
    JMRS &copy; {{ new Date().getFullYear() }}
  </div>
</template>
