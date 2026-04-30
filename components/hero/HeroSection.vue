<script setup>
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import GraffitiTag from '~/components/graffiti/GraffitiTag.vue'
import StreetButton from '~/components/ui/StreetButton.vue'
import anime from 'animejs'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const { t, locale } = useI18n()

const rotatingWords = computed(() => {
  const words = t('hero.rotatingWords')
  return Array.isArray(words) ? words : []
})

const displayWord = ref('')
const activeIndex = ref(0)
const isDeleting = ref(false)
let tickTimer

const heroCards = computed(() => {
  const cards = t('hero.cards')
  return Array.isArray(cards) ? cards : []
})

const clearTimers = () => {
  if (tickTimer) {
    clearTimeout(tickTimer)
    tickTimer = undefined
  }
}

const startTypingCycle = () => {
  clearTimers()
  const words = rotatingWords.value
  if (!words.length) {
    displayWord.value = ''
    return
  }

  const currentWord = words[activeIndex.value % words.length]
  const target = isDeleting.value ? currentWord.slice(0, displayWord.value.length - 1) : currentWord.slice(0, displayWord.value.length + 1)
  displayWord.value = target

  const finishedTyping = displayWord.value === currentWord
  const finishedDeleting = displayWord.value === ''

  let delay = isDeleting.value ? 45 : 70

  if (finishedTyping) {
    delay = 1200
    isDeleting.value = true
  } else if (finishedDeleting) {
    isDeleting.value = false
    activeIndex.value = (activeIndex.value + 1) % words.length
    delay = 200
  }

  tickTimer = window.setTimeout(startTypingCycle, delay)
}

watch(rotatingWords, () => {
  activeIndex.value = 0
  startTypingCycle()
})

onMounted(() => {
  startTypingCycle()
  
  const animateHero = () => {
    anime({
      targets: '.anime-element',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100, { start: 200 }),
      easing: 'easeOutElastic(1, .8)',
      duration: 1000
    })
  }
  
  animateHero()

  // Re-animar cuando cambie el idioma para que los nuevos elementos del DOM no queden en opacity-0
  watch(locale, () => {
    // Aumentamos el timeout para asegurar que Vue actualice el DOM de los v-for primero
    setTimeout(() => {
      anime({
        targets: '.anime-element',
        translateY: [20, 0],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .8)',
        duration: 1000
      })
    }, 250)
  })
})

useTextSplit('.split-text-hero', { stagger: 40, duration: 1000 })

onBeforeUnmount(() => {
  clearTimers()
})
</script>

<template>
  <UContainer
    as="section"
    class="relative flex flex-col gap-10 pt-12 pb-14 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
  >
    <!-- Spray decorations -->
    <SpraySplatter class="absolute top-4 right-10" size="lg" :opacity="0.06" />
    <SpraySplatter class="absolute bottom-10 left-4" size="md" :opacity="0.05" />

    <!-- Graffiti crown SVG decoration -->
    <svg class="absolute top-8 right-12 sm:right-24 w-16 h-12 sm:w-24 sm:h-16 opacity-[0.07] text-[var(--color-accent)]" viewBox="0 0 100 70" fill="currentColor" aria-hidden="true">
      <path d="M10 60 L10 25 L30 40 L50 10 L70 40 L90 25 L90 60 Z" />
      <circle cx="10" cy="20" r="4" /><circle cx="50" cy="5" r="4" /><circle cx="90" cy="20" r="4" />
    </svg>

    <div class="flex-1 space-y-8 relative z-10">
      <UBadge
        size="lg"
        variant="outline"
        class="gap-2 anime-element opacity-0"
        :class="isLight ? 'border-[var(--color-accent)]/40 text-slate-600' : 'border-[var(--color-accent)]/40 text-slate-300'"
      >
        <span class="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        {{ t('hero.availability') }}
      </UBadge>

      <div class="space-y-4 anime-element opacity-0">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
          {{ t('hero.tagline') }}
        </p>
        <h1
          class="text-4xl font-black leading-tight tracking-[0.06em] text-spray sm:text-5xl lg:text-6xl text-balance" 
          :key="locale"
          :class="isLight ? 'text-slate-700' : 'text-white'"
        >
          <span class="split-text-hero">{{ t('hero.title.main') }}</span>
          {{ ' ' }}
          <span class="text-[var(--color-accent)] split-text-hero">{{ t('hero.title.highlight1') }}</span>
          {{ ' ' }}
          <span class="split-text-hero">{{ t('hero.title.connector') }}</span>
          {{ ' ' }}
          <span class="text-[var(--color-accent)] split-text-hero">{{ t('hero.title.highlight2') }}</span>
        </h1>
        <p class="max-w-2xl text-lg leading-relaxed font-body" style="letter-spacing: 0.02em" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          {{ t('hero.subtitle') }}
        </p>
      </div>

      <!-- Typing effect with graffiti style -->
      <div class="flex flex-wrap items-center gap-4 text-lg font-semibold anime-element opacity-0" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
        <span :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ t('hero.rolePrefix') }}</span>
        <span class="relative border-sketchy px-4 py-2">
          <span class="font-marker text-[var(--color-accent)]" style="letter-spacing: 0.04em">{{ displayWord }}</span>
          <span class="ml-0.5 inline-block animate-pulse text-[var(--color-accent)]">|</span>
        </span>
      </div>

      <div class="flex flex-wrap gap-3 pt-2 anime-element opacity-0">
        <StreetButton to="/proyectos" variant="primary">
          {{ t('hero.ctas.projects') }}
        </StreetButton>
        <StreetButton to="/contacto" variant="ghost">
          {{ t('hero.ctas.contact') }}
        </StreetButton>
      </div>

      <!-- Hero cards as graffiti stickers -->
      <div v-if="heroCards.length" class="grid gap-5 sm:grid-cols-3 pt-4" :key="`cards-${locale}`">
        <div v-for="(card, idx) in heroCards" :key="idx" class="anime-element opacity-0">
          <div
            class="relative px-5 py-4 border-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_12px_var(--color-accent-soft)] h-full"
            :class="isLight ? 'border-[var(--color-border)] bg-[var(--color-surface-card)]' : 'border-[var(--color-border)] bg-[var(--color-surface-card)]'"
            :style="{
              borderRadius: '4px 10px 5px 8px',
              backdropFilter: 'blur(12px)',
              transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)`
            }"
          >
            <PaintDrip class="absolute -top-2 right-4" :count="2" color="var(--color-accent)" />
            <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ card.label }}</p>
            <p class="text-lg font-semibold" :class="isLight ? 'text-slate-600' : 'text-slate-100'">{{ card.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
