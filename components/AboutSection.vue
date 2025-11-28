<script setup>
import GlowCard from './GlowCard.vue'

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
        <GlowCard
          :is-light="isLight"
          rounded="rounded-[32px]"
          body-padding="p-6 sm:p-7 lg:p-8"
          body-class="space-y-5"
          :float="true"
          :delay="0"
          card-class="shadow-[0_25px_80px_-35px_rgba(248,113,113,0.45)]"
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
            <GlowCard
              v-for="(row, idx) in [
                { label: 'Frontend', value: 'Vue - Nuxt - Tailwind' },
                { label: 'Backend', value: 'Node - MongoDB' },
                { label: 'UI Motion', value: 'GSAP - Microinteracciones' }
              ]"
              :key="row.label"
              :is-light="isLight"
              rounded="rounded-2xl"
              body-padding="px-5 py-4"
              body-class="flex items-center justify-between"
              :float="true"
              :delay="idx * 120"
              card-class="shadow-[0_20px_55px_-42px_rgba(248,113,113,0.8)]"
            >
              <span class="text-base font-medium" :class="isLight ? 'text-slate-800' : 'text-slate-200'">{{ row.label }}</span>
              <span class="text-base font-semibold text-red-500">{{ row.value }}</span>
            </GlowCard>
          </div>
        </GlowCard>

        <GlowCard
          :is-light="isLight"
          rounded="rounded-[28px]"
          body-padding="p-6"
          body-class="space-y-4"
          :float="true"
          card-class="shadow-[0_25px_80px_-40px_rgba(248,113,113,0.45)]"
        >
          <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            Habilidades
          </p>
          <div class="grid gap-3 sm:grid-cols-2">
            <GlowCard
              v-for="(skill, idx) in [
                { title: 'Frontend y UI', copy: 'Vue, Nuxt, Tailwind, GSAP, accesibilidad, diseno responsivo.' },
                { title: 'Backend y datos', copy: 'Node.js, MongoDB, APIs REST, despliegues rapidos y seguros.' },
                { title: 'Experiencia de producto', copy: 'Microinteracciones, PWAs, rendimiento, optimizacion de SEO.' },
                { title: 'Herramientas', copy: 'Figma, GitHub, Nuxt UI, SendGrid, CI/CD ligero.' }
              ]"
              :key="skill.title"
              :delay="idx * 120"
              :is-light="isLight"
              rounded="rounded-2xl"
              body-padding="px-4 py-4"
              body-class="text-sm transition-colors"
              :float="true"
              card-class="shadow-[0_20px_55px_-42px_rgba(248,113,113,0.8)]"
            >
              <p class="font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">{{ skill.title }}</p>
              <p :class="isLight ? 'text-slate-600' : 'text-slate-300'">{{ skill.copy }}</p>
            </GlowCard>
          </div>
        </GlowCard>
      </div>
    </div>
  </UContainer>
</template>
