<script setup lang="ts">
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import StreetButton from '~/components/ui/StreetButton.vue'
import anime from 'animejs'

const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const { t, locale } = useI18n()

const aboutChips = computed(() => {
  const chips = t('about.chips')
  return Array.isArray(chips) ? chips : []
})

const aboutSummary = computed(() => {
  const summary = t('about.summary')
  return Array.isArray(summary) ? summary : []
})

const aboutSkills = computed(() => {
  const skills = t('about.skills')
  return Array.isArray(skills) ? skills : []
})

const chipRotation = (idx: number) => {
  const angles = [-2, 1.5, -1, 2.5, -1.5, 1.8]
  return angles[idx % angles.length]
}

useScrollAnimation('.about-animate-trigger', {
  animation: {
    translateY: [40, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200
  },
  stagger: 150
})

useTextSplit('.split-text-about', { stagger: 30 })
</script>

<template>
  <UContainer
    as="section"
    id="sobre-mi"
    class="py-14 sm:py-20"
  >
    <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start about-animate-trigger animate-group">
      <!-- Left column -->
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
          <h2 class="text-3xl font-bold text-spray sm:text-4xl lg:text-5xl leading-tight split-text-about text-balance" :key="locale" :class="isLight ? 'text-slate-700' : 'text-white'">
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

      <!-- Right column -->
      <div class="space-y-6">
        <!-- Profile card as street poster -->
        <div class="about-poster relative overflow-hidden animate-item opacity-0">
          <!-- Spray decorations -->
          <SpraySplatter class="absolute -top-2 -right-2" size="sm" :opacity="0.08" />

          <!-- Tape top-left -->
          <div class="about-poster__tape about-poster__tape--left" aria-hidden="true" />
          <!-- Tape top-right -->
          <div class="about-poster__tape about-poster__tape--right" aria-hidden="true" />

          <div class="relative z-10 p-6 sm:p-7">
            <div class="flex items-start justify-between gap-4">
              <div class="flex items-center gap-4">
                <!-- Street style Avatar -->
                <div class="avatar-street group relative shrink-0">
                  <!-- Cinta adhesiva -->
                  <div class="absolute -top-2 -left-2 w-8 h-3 bg-[var(--color-accent)] opacity-80 rotate-[-15deg] shadow-sm z-20" aria-hidden="true" />
                  
                  <!-- Fondo Neon (Glow) -->
                  <div class="absolute inset-0 bg-[var(--color-accent)] blur-md opacity-30 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 z-0" />
                  
                  <!-- Foto -->
                  <NuxtImg
                    src="https://avatars.githubusercontent.com/u/74984894?v=4"
                    alt="Juan Miguel Ruiz Supelano"
                    width="80"
                    height="80"
                    class="avatar-img relative z-10 w-16 h-16 sm:w-20 sm:h-20 object-cover rounded shadow-lg border-2 border-[var(--color-surface)] group-hover:border-[var(--color-accent)]"
                  />
                  
                  <!-- Firma mini -->
                  <span class="absolute -bottom-2 -right-3 font-marker text-[0.55rem] text-[var(--color-accent)] rotate-[-10deg] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    JMRS
                  </span>
                </div>
                <div class="space-y-0.5">
                  <p class="text-lg font-bold text-spray" :class="isLight ? 'text-slate-700' : 'text-white'">{{ t('hero.name') }}</p>
                  <p class="text-sm font-marker" :class="isLight ? 'text-slate-500' : 'text-slate-400'" style="letter-spacing: 0.04em">
                    Developer · Designer · Est. Ing. Sistemas
                  </p>
                  <p class="text-xs" :class="isLight ? 'text-slate-400' : 'text-slate-500'" style="letter-spacing: 0.04em">
                    Villavicencio, Colombia · Remoto
                  </p>
                </div>
              </div>
              <!-- Availability as neon badge -->
              <span
                class="hidden sm:inline-flex tag-sticker text-xs uppercase tracking-wider animate-pulse shrink-0"
                style="transform: rotate(2deg)"
              >
                {{ t('about.availability') }}
              </span>
            </div>

            <!-- Summary rows with spray accent -->
            <div class="mt-5 space-y-2">
              <div
                v-for="(row, idx) in aboutSummary"
                :key="row.label"
                class="about-summary-row flex items-center justify-between px-4 py-3"
                :class="isLight ? 'bg-white/60' : 'bg-slate-900/60'"
              >
                <span class="text-sm font-medium" :class="isLight ? 'text-slate-600' : 'text-slate-300'">{{ row.label }}</span>
                <span class="text-sm font-bold text-[var(--color-accent)]">{{ row.value }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom spray mark -->
          <div class="absolute bottom-2 right-4 font-marker text-[0.6rem] tracking-wide opacity-20 text-[var(--color-accent)]" aria-hidden="true">
            JMRS ★
          </div>
        </div>

        <!-- Skills as tagged wall -->
        <div class="about-skills-wall relative overflow-hidden animate-item opacity-0">
          <SpraySplatter class="absolute bottom-4 left-2" size="md" :opacity="0.05" />

          <div class="relative z-10 p-6">
            <span
              class="tag-sticker text-xs uppercase tracking-widest mb-5 inline-block"
              style="transform: rotate(-1deg)"
            >
              {{ t('about.skillsTitle') }}
            </span>

            <div class="grid gap-3 sm:grid-cols-2 mt-4">
              <div
                v-for="(skill, idx) in aboutSkills"
                :key="skill.title"
                class="about-skill-card group"
                :style="{ '--card-rotate': `${idx % 2 === 0 ? -0.8 : 0.6}deg` }"
              >
                <p class="text-sm font-bold text-spray" :class="isLight ? 'text-slate-600' : 'text-slate-200'">
                  {{ skill.title }}
                </p>
                <p class="text-xs mt-1 leading-relaxed" :class="isLight ? 'text-slate-500' : 'text-slate-400'" style="letter-spacing: 0.03em">
                  {{ skill.copy }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>

<style scoped>
/* Street poster card — solid on the wall */
.about-poster {
  border: 2px solid var(--color-border-accent);
  border-radius: 4px 10px 6px 12px;
  background: var(--color-surface);
  box-shadow: var(--shadow-glow);
  transition: box-shadow 0.3s var(--ease-spring);
}

.about-poster:hover {
  box-shadow: var(--shadow-neon);
}

/* Tape strips */
.about-poster__tape {
  position: absolute;
  width: 60px;
  height: 16px;
  background: var(--color-accent);
  opacity: 0.7;
  z-index: 20;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.3);
}

.about-poster__tape--left {
  top: -4px;
  left: 16px;
  transform: rotate(-3deg);
  border-radius: 1px;
}

.about-poster__tape--right {
  top: -4px;
  right: 16px;
  transform: rotate(2deg);
  border-radius: 1px;
}

/* Summary rows */
.about-summary-row {
  border: 1px solid var(--color-border);
  border-radius: 3px 8px 4px 6px;
  transition: all 0.2s var(--ease-spring);
}

.about-summary-row:hover {
  border-color: var(--color-accent);
  box-shadow: 0 0 8px var(--color-accent-soft);
}

/* Skills wall — solid on the wall */
.about-skills-wall {
  border: 2px solid var(--color-border-accent);
  border-radius: 6px 4px 10px 5px;
  background: var(--color-surface);
  box-shadow: var(--shadow-glow);
}

/* Skill cards */
.about-skill-card {
  padding: 0.875rem 1rem;
  border: 1px dashed var(--color-border-accent);
  border-radius: 3px 8px 5px 10px;
  background: var(--color-surface);
  transform: rotate(var(--card-rotate, 0deg));
  transition: all 0.3s var(--ease-spring);
}

.about-skill-card:hover {
  transform: rotate(0deg) scale(1.02);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-neon);
}

/* Chip hover */
.about-chip {
  transition: all 0.2s var(--ease-spring);
}

.about-chip:hover {
  transform: rotate(0deg) scale(1.1) !important;
  box-shadow: var(--shadow-neon);
}

/* Avatar Street Style */
.avatar-street {
  transform: rotate(3deg);
  transition: all 0.4s var(--ease-spring);
}

.avatar-street:hover {
  transform: rotate(-2deg) scale(1.05);
}

.avatar-img {
  filter: grayscale(100%) contrast(120%) brightness(0.9);
  transition: all 0.4s var(--ease-spring);
}

.avatar-street:hover .avatar-img {
  filter: grayscale(0%) contrast(105%) brightness(1);
}
</style>
