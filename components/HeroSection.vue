<script setup>
import GlowCard from './GlowCard.vue'

const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()

const rotatingWords = computed(() => {
  const words = t('hero.rotatingWords')
  return Array.isArray(words) ? words : []
})
const activeWord = ref(rotatingWords.value[0] || '')
let intervalId

const heroCards = computed(() => {
  const cards = t('hero.cards')
  return Array.isArray(cards) ? cards : []
})

watch(rotatingWords, (words) => {
  activeWord.value = words?.[0] || ''
})

onMounted(() => {
  let index = 0
  intervalId = window.setInterval(() => {
    const words = rotatingWords.value
    if (!words.length) return
    index = (index + 1) % words.length
    activeWord.value = words[index]
  }, 2200)
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <UContainer
    as="section"
    class="relative flex flex-col gap-8 pt-8 pb-10 sm:pt-10 sm:pb-14 lg:pt-14 lg:pb-16"
  >
    <div class="absolute inset-0 -z-10">
      <div class="absolute left-10 top-10 h-48 w-48 rounded-full blur-3xl" :class="isLight ? 'bg-emerald-300/35' : 'bg-red-500/20'" />
      <div class="absolute right-10 top-24 h-60 w-60 rounded-full blur-3xl" :class="isLight ? 'bg-emerald-200/50' : 'bg-white/10'" />
      <div class="absolute -bottom-10 left-1/3 h-60 w-60 rounded-full blur-3xl" :class="isLight ? 'bg-emerald-300/20' : 'bg-red-500/10'" />
    </div>

    <div class="flex-1 space-y-6">
      <UBadge
        size="lg"
        variant="outline"
        class="gap-2 shadow-sm"
        :class="
            isLight
              ? 'border-emerald-300 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50'
              : 'border border-red-500/80 text-white hover:border-red-400 hover:bg-red-500/10'
          "
      >
        <span class="inline-flex h-2 w-2 animate-pulse rounded-full" :class="isLight ? 'bg-emerald-500' : 'bg-red-500'" />
        {{ t('hero.availability') }}
      </UBadge>

      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          {{ t('hero.tagline') }}
        </p>
        <h1
          class="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          :class="isLight ? 'text-slate-900' : 'text-white'"
        >
          {{ t('hero.title.main') }}
          <span :class="isLight ? 'text-emerald-600' : 'text-red-500'">{{ t('hero.title.highlight1') }}</span>
          {{ t('hero.title.connector') }}
          <span :class="isLight ? 'text-emerald-600' : 'text-red-500'">{{ t('hero.title.highlight2') }}</span>
        </h1>
        <p class="max-w-2xl text-lg" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
          {{ t('hero.subtitle') }}
        </p>
      </div>

      <div
        class="flex flex-wrap items-center gap-4 text-lg font-semibold"
        :class="isLight ? 'text-slate-700' : 'text-slate-200'"
      >
        <span :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ t('hero.rolePrefix') }}</span>
        <span
          class="relative rounded-2xl px-4 py-2 transition border-2"
          :class="isLight ? 'border-emerald-500 text-emerald-700 bg-transparent' : 'border-red-500 text-red-500 bg-transparent'"
        >
          <span :class="isLight ? 'text-emerald-700' : 'text-red-500'">{{ activeWord }}</span>
          <span class="ml-1 inline-block animate-pulse" :class="isLight ? 'text-emerald-500' : 'text-red-400'">|</span>
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <UButton
          to="/proyectos"
          size="lg"
          class="shadow-lg transition hover:-translate-y-0.5"
          :class="
            isLight
              ? 'bg-[#10b981] text-black shadow-emerald-400/30 hover:bg-[#22c55e]'
              : 'bg-red-600 text-white shadow-red-500/30 hover:bg-red-500'
          "
        >
          {{ t('hero.ctas.projects') }}
        </UButton>
        <UButton
          to="/contacto"
          size="lg"
          variant="outline"
          class="transition hover:-translate-y-0.5"
          :class="isLight ? 'border border-emerald-300 text-emerald-700 bg-white hover:bg-emerald-50' : 'border border-red-500 text-white bg-transparent hover:bg-red-500/10'"
        >
          {{ t('hero.ctas.contact') }}
        </UButton>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <GlowCard
          v-for="(card, idx) in heroCards"
          :key="card.label"
          :is-light="isLight"
          :glow="false"
          :highlight="false"
          :delay="idx * 120"
          rounded="rounded-3xl"
          body-padding="p-4"
          body-class="space-y-1"
          card-class="border-2 bg-transparent text-inherit shadow-none"
        >
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ card.label }}</p>
          <p class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">{{ card.value }}</p>
        </GlowCard>
      </div>
    </div>

  </UContainer>
</template>
