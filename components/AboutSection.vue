<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <UContainer
    as="section"
    id="sobre-mi"
    class="py-16 sm:py-20"
  >
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="space-y-4">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          Sobre mi
        </p>
        <h2 class="text-3xl font-semibold sm:text-4xl" :class="isLight ? 'text-slate-900' : 'text-white'">
          Diseno y desarrollo <span class="text-red-500">productos</span> digitales que se sienten vivos.
        </h2>
        <p class="text-lg" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
          Soy Juan Miguel Ruiz Supelano, desarrollador y disenador que estudia Ingenieria de Sistemas.
          Creo interfaces limpias, rapidas y con una dosis justa de brutalismo moderno.
        </p>
        <div class="flex flex-wrap gap-3">
          <UBadge
            v-for="chip in ['Frontend', 'UX/UI', 'PWAs', 'Animacion']"
            :key="chip"
            variant="outline"
            :color="isLight ? 'gray' : 'white'"
            class="text-sm"
            :class="isLight ? 'border-slate-200 bg-white text-slate-800' : 'border-white/15 bg-white/5 text-slate-200'"
          >
            {{ chip }}
          </UBadge>
        </div>
      </div>

      <div class="space-y-6">
        <UCard
          class="relative overflow-hidden shadow-[0_25px_80px_-35px_rgba(248,113,113,0.45)]"
          :class="isLight ? 'border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100' : 'border border-white/10 bg-gradient-to-br from-[#1b1b1f] via-[#111] to-[#1d0b0b]'"
          :ui="{ rounded: 'rounded-[32px]', body: { base: 'p-6 sm:p-7 lg:p-8 space-y-5' } }"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <UAvatar
                size="2xl"
                src="https://avatars.githubusercontent.com/u/11875214?v=4"
                alt="Juan Miguel Ruiz Supelano"
                class="border border-white/15 shadow-lg shadow-red-500/30"
                :ui="{ rounded: 'rounded-3xl' }"
              />
              <div class="space-y-1">
                <p class="text-xl font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">Juan Miguel Ruiz Supelano</p>
                <p class="text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-300'">Developer - Designer - Est. Ing. Sistemas</p>
                <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Bogota, Colombia · Remoto</p>
              </div>
            </div>
            <UBadge
              variant="solid"
              color="red"
              class="rounded-full px-4 py-2 text-sm font-semibold shadow-md shadow-red-500/40"
            >
              Disponible
            </UBadge>
          </div>

          <div class="space-y-3">
            <div
              v-for="row in [
                { label: 'Frontend', value: 'Vue - Nuxt - Tailwind' },
                { label: 'Backend', value: 'Node - MongoDB' },
                { label: 'UI Motion', value: 'GSAP - Microinteracciones' }
              ]"
              :key="row.label"
              class="flex items-center justify-between rounded-2xl border px-5 py-4"
              :class="isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/10 bg-black/40 shadow-[0_15px_45px_-30px_rgba(248,113,113,0.6)] backdrop-blur-sm'"
            >
              <span class="text-base font-medium" :class="isLight ? 'text-slate-800' : 'text-slate-200'">{{ row.label }}</span>
              <span class="text-base font-semibold text-red-500">{{ row.value }}</span>
            </div>
          </div>
        </UCard>

        <UCard
          class="shadow-[0_25px_80px_-40px_rgba(248,113,113,0.45)]"
          :class="isLight ? 'border border-slate-200 bg-white' : 'border border-white/10 bg-black/35 backdrop-blur-lg'"
          :ui="{ rounded: 'rounded-[28px]', body: { base: 'p-6 space-y-4' } }"
        >
          <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            Habilidades
          </p>
          <div class="grid gap-3 sm:grid-cols-2">
            <div
              v-for="skill in [
                { title: 'Frontend y UI', copy: 'Vue, Nuxt, Tailwind, GSAP, accesibilidad, diseno responsivo.' },
                { title: 'Backend y datos', copy: 'Node.js, MongoDB, APIs REST, despliegues rapidos y seguros.' },
                { title: 'Experiencia de producto', copy: 'Microinteracciones, PWAs, rendimiento, optimizacion de SEO.' },
                { title: 'Herramientas', copy: 'Figma, GitHub, Nuxt UI, SendGrid, CI/CD ligero.' }
              ]"
              :key="skill.title"
              class="rounded-2xl border px-4 py-4 text-sm transition-colors"
              :class="isLight ? 'border-slate-200 bg-white text-slate-700 shadow-sm' : 'border-white/10 bg-white/5 text-slate-200 shadow-[0_20px_50px_-40px_rgba(248,113,113,0.65)]'"
            >
              <p class="font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">{{ skill.title }}</p>
              <p :class="isLight ? 'text-slate-600' : 'text-slate-300'">{{ skill.copy }}</p>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>
