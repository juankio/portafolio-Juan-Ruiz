<script setup>
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import GraffitiTag from '~/components/graffiti/GraffitiTag.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const { t } = useI18n()

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
})

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
        class="gap-2"
        :class="isLight ? 'border-[var(--color-accent)]/40 text-slate-600' : 'border-[var(--color-accent)]/40 text-slate-300'"
      >
        <span class="inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]" />
        {{ t('hero.availability') }}
      </UBadge>

      <div class="space-y-4">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
          {{ t('hero.tagline') }}
        </p>
        <h1
          class="text-4xl font-black leading-tight tracking-[0.06em] text-spray sm:text-5xl lg:text-6xl"
          :class="isLight ? 'text-slate-700' : 'text-white'"
        >
          {{ t('hero.title.main') }}
          <span class="text-[var(--color-accent)]">{{ t('hero.title.highlight1') }}</span>
          {{ t('hero.title.connector') }}
          <span class="text-[var(--color-accent)]">{{ t('hero.title.highlight2') }}</span>
        </h1>
        <p class="max-w-2xl text-lg leading-relaxed font-body" style="letter-spacing: 0.02em" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          {{ t('hero.subtitle') }}
        </p>
      </div>

      <!-- Typing effect with graffiti style -->
      <div class="flex flex-wrap items-center gap-4 text-lg font-semibold" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
        <span :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ t('hero.rolePrefix') }}</span>
        <span class="relative border-sketchy px-4 py-2">
          <span class="font-marker text-[var(--color-accent)]" style="letter-spacing: 0.04em">{{ displayWord }}</span>
          <span class="ml-0.5 inline-block animate-pulse text-[var(--color-accent)]">|</span>
        </span>
      </div>

      <div class="flex flex-wrap gap-3 pt-2">
        <UButton
          to="/proyectos"
          size="lg"
          class="border-sketchy !rounded-none bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)] shadow-lg transition-transform hover:-translate-y-0.5"
        >
          {{ t('hero.ctas.projects') }}
        </UButton>
        <UButton
          to="/contacto"
          size="lg"
          variant="outline"
          class="transition-transform hover:-translate-y-0.5"
          :class="isLight ? 'border-slate-300 text-slate-700 hover:bg-slate-100' : 'border-slate-600 text-slate-200 hover:bg-slate-800'"
        >
          {{ t('hero.ctas.contact') }}
        </UButton>
      </div>

      <!-- Hero cards as graffiti stickers -->
      <div v-if="heroCards.length" class="grid gap-5 sm:grid-cols-3 pt-4">
        <div
          v-for="(card, idx) in heroCards"
          :key="card.label"
          class="relative px-5 py-4 border-2 transition-all hover:-translate-y-0.5 hover:shadow-[0_0_12px_var(--color-accent-soft)]"
          :class="isLight ? 'border-[var(--color-border)] bg-[var(--color-surface-card)]' : 'border-[var(--color-border)] bg-[var(--color-surface-card)]'"
          style="border-radius: 4px 10px 5px 8px; backdrop-filter: blur(12px)"
          :style="{ transform: `rotate(${idx % 2 === 0 ? -1 : 1}deg)` }"
        >
          <PaintDrip class="absolute -top-2 right-4" :count="2" color="var(--color-accent)" />
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ card.label }}</p>
          <p class="text-lg font-semibold" :class="isLight ? 'text-slate-600' : 'text-slate-100'">{{ card.value }}</p>
        </div>
      </div>
    </div>
  </UContainer>
</template>
