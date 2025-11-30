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
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <section class="space-y-3">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          {{ t('about.sectionTitle') }}
        </p>

        <h1 class="text-4xl font-semibold leading-tight sm:text-5xl" :class="isLight ? 'text-slate-900' : 'text-white'">
          {{ t('about.headline.lead') }}
          <span :class="isLight ? 'text-emerald-600' : 'text-red-500'">{{ t('about.headline.accent') }}</span>
          {{ t('about.headline.tail') }}
        </h1>

        <p class="max-w-3xl text-lg" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
          {{ t('about.intro') }}
        </p>

        <div class="flex flex-wrap gap-3">
          <UBadge
            v-for="chip in chips"
            :key="chip"
            variant="outline"
            :class="isLight ? 'border-slate-200 bg-white text-slate-800' : 'border-white/15 bg-white/5 text-slate-200'"
          >
            {{ chip }}
          </UBadge>
        </div>

        <div class="flex flex-wrap gap-3">
          <UButton
            to="/proyectos"
            size="lg"
            :class="isLight ? 'bg-[#10b981] text-black hover:bg-[#22c55e]' : 'bg-red-600 text-white hover:bg-red-500'"
            class="shadow-lg shadow-emerald-300/25 hover:-translate-y-0.5"
          >
            {{ t('hero.ctas.projects') }}
          </UButton>
          <UButton
            to="/contacto"
            size="lg"
            variant="outline"
            class="hover:-translate-y-0.5"
            :class="isLight ? 'border border-emerald-200 text-emerald-700 bg-white hover:bg-emerald-50' : 'border border-red-500 text-white bg-transparent hover:bg-red-500/10'"
          >
            {{ t('hero.ctas.contact') }}
          </UButton>
        </div>
      </section>
    </div>
  </UContainer>
</template>
