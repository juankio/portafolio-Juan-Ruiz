<script setup lang="ts">
import { inject, ref } from 'vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import StreetButton from '~/components/ui/StreetButton.vue'

const isLight = inject('isLight', ref(false))

const { t } = useI18n()

const aboutChips = computed(() => {
  const chips = t('about.chips')
  return Array.isArray(chips) ? chips : []
})

const chipRotation = (idx: number) => {
  const angles = [-2, 1.5, -1, 2.5, -1.5, 1.8]
  return angles[idx % angles.length]
}
</script>

<template>
  <div class="space-y-6">
    <!-- Section label as tape sticker -->
    <span
      class="tag-sticker inline-block text-xs uppercase tracking-widest animate-item opacity-0"
      style="transform: rotate(-1.5deg)"
    >
      {{ t('about.sectionTitle') }}
    </span>

    <!-- Headline with spray effect -->
    <div class="relative animate-item opacity-0">
      <h2 class="text-3xl font-bold text-spray sm:text-4xl lg:text-5xl leading-tight split-text-about text-balance" :class="isLight ? 'text-slate-700' : 'text-white'">
        {{ t('about.headline.lead') }}
        <span class="text-[var(--color-accent)]">{{ t('about.headline.accent') }}</span>
        {{ t('about.headline.tail') }}
      </h2>
      <PaintDrip
        class="absolute -bottom-4 left-12"
        :count="2"
        :animated="true"
      />
    </div>

    <!-- Intro text -->
    <p class="text-base leading-relaxed max-w-xl animate-item opacity-0" :class="isLight ? 'text-slate-500' : 'text-slate-400'" style="letter-spacing: 0.04em">
      {{ t('about.intro') }}
    </p>

    <!-- Chips as graffiti stickers -->
    <div class="flex flex-wrap gap-3 pt-1 animate-item opacity-0">
      <span
        v-for="(chip, idx) in aboutChips"
        :key="chip"
        class="about-chip tag-sticker text-xs cursor-default"
        :style="{ transform: `rotate(${chipRotation(idx)}deg)` }"
      >
        {{ chip }}
      </span>
    </div>

    <!-- CTAs with sketchy style -->
    <div class="flex flex-wrap gap-4 pt-3 animate-item opacity-0">
      <StreetButton to="/proyectos" variant="primary">
        {{ t('hero.ctas.projects') }}
      </StreetButton>
      <StreetButton to="/contacto" variant="ghost">
        {{ t('hero.ctas.contact') }}
      </StreetButton>
    </div>
  </div>
</template>

<style scoped>
/* Chip hover */
.about-chip {
  transition: all 0.2s var(--ease-spring);
}

.about-chip:hover {
  transform: rotate(0deg) scale(1.1) !important;
  box-shadow: var(--shadow-neon);
}
</style>
