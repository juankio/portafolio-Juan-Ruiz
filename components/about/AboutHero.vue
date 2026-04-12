<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  },
  chips: {
    type: Array,
    default: () => []
  }
})

const { t } = useI18n()
</script>

<template>
  <UContainer as="section" id="sobre-mi" class="py-10 sm:py-14">
    <div class="space-y-4 animate-fade-in-up">
      <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
        {{ t('about.sectionTitle') }}
      </p>

      <h1 class="text-4xl font-bold leading-tight text-spray sm:text-5xl" :class="isLight ? 'text-slate-700' : 'text-white'">
        {{ t('about.headline.lead') }}
        <span class="text-[var(--color-accent)]">{{ t('about.headline.accent') }}</span>
        {{ t('about.headline.tail') }}
      </h1>

      <p class="max-w-3xl text-lg leading-relaxed" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
        {{ t('about.intro') }}
      </p>

      <div class="flex flex-wrap gap-2 pt-1">
        <UBadge
          v-for="chip in chips"
          :key="chip"
          variant="outline"
          :class="isLight ? 'border-slate-200 text-slate-600' : 'border-slate-700 text-slate-300'"
        >
          {{ chip }}
        </UBadge>
      </div>

      <div class="flex flex-wrap gap-3 pt-2">
        <UButton
          to="/proyectos"
          size="lg"
          class="transition-transform hover:-translate-y-0.5"
          :class="isLight ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-red-600 text-white hover:bg-red-500'"
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
    </div>
  </UContainer>
</template>
