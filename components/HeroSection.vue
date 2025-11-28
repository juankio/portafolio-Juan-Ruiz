<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const rotatingWords = ['Frontend Developer', 'UI Designer', 'PWA Builder', 'Creative Coder']
const activeWord = ref(rotatingWords[0])
let intervalId

onMounted(() => {
  let index = 0
  intervalId = window.setInterval(() => {
    index = (index + 1) % rotatingWords.length
    activeWord.value = rotatingWords[index]
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
    id="inicio"
    class="relative flex flex-col gap-10 pt-10 pb-16 sm:pt-12 sm:pb-20 lg:flex-row lg:items-center lg:pt-16 lg:pb-24"
  >
    <div class="absolute inset-0 -z-10">
      <div class="absolute left-10 top-10 h-48 w-48 rounded-full blur-3xl" :class="isLight ? 'bg-red-500/30' : 'bg-red-500/20'" />
      <div class="absolute right-10 top-24 h-60 w-60 rounded-full blur-3xl" :class="isLight ? 'bg-slate-200/60' : 'bg-white/10'" />
      <div class="absolute -bottom-10 left-1/3 h-60 w-60 rounded-full blur-3xl" :class="isLight ? 'bg-red-500/15' : 'bg-red-500/10'" />
    </div>

    <div class="flex-1 space-y-6">
      <UBadge
        size="lg"
        :color="isLight ? 'gray' : 'white'"
        variant="soft"
        class="gap-2 border shadow-sm shadow-red-500/20"
        :class="isLight ? 'border-slate-200 text-slate-800 bg-white' : 'border-white/10 text-slate-200 bg-white/5'"
      >
        <span class="inline-flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
        Disponible para nuevos retos
      </UBadge>

      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          Juan Miguel Ruiz Supelano
        </p>
        <h1
          class="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          :class="isLight ? 'text-slate-900' : 'text-white'"
        >
          Construyo experiencias web <span class="text-red-500">rapidas</span> y
          <span class="text-red-500">intencionales</span>.
        </h1>
        <p class="max-w-2xl text-lg" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
          Desarrollador, disenador y estudiante de Ingenieria de Sistemas. Me enfoco en interfaces limpias,
          PWAs confiables y productos digitales con intencion.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-4 text-lg font-semibold text-slate-200">
        <span class="text-slate-400">Soy</span>
        <span class="relative rounded-2xl bg-white/5 px-4 py-2 shadow-inner shadow-red-500/20 transition">
          <span class="text-red-500">{{ activeWord }}</span>
          <span class="ml-1 inline-block animate-pulse text-red-400">|</span>
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <UButton
          to="/proyectos"
          size="lg"
          class="bg-red-500 text-black shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:bg-red-400"
        >
          Ver proyectos
        </UButton>
        <UButton
          to="/contacto"
          size="lg"
          variant="outline"
          class="transition hover:-translate-y-0.5"
          :class="isLight ? 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50' : 'border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10'"
        >
          Hablemos
        </UButton>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <UCard
          class="shadow-sm transition-colors"
          :class="isLight ? 'border border-slate-200 bg-white shadow-slate-200/80' : 'border border-white/10 bg-white/5 shadow-white/10'"
          :ui="{ rounded: 'rounded-3xl', body: { base: 'p-4 space-y-1' } }"
        >
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Especialidad</p>
          <p class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">Nuxt - Vue - PWA</p>
        </UCard>
        <UCard
          class="shadow-sm transition-colors"
          :class="isLight ? 'border border-slate-200 bg-white shadow-slate-200/80' : 'border border-white/10 bg-white/5 shadow-white/10'"
          :ui="{ rounded: 'rounded-3xl', body: { base: 'p-4 space-y-1' } }"
        >
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Stack visual</p>
          <p class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">Tailwind - Animaciones suaves</p>
        </UCard>
        <UCard
          class="shadow-sm transition-colors"
          :class="isLight ? 'border border-slate-200 bg-white shadow-slate-200/80' : 'border border-white/10 bg-white/5 shadow-white/10'"
          :ui="{ rounded: 'rounded-3xl', body: { base: 'p-4 space-y-1' } }"
        >
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Disponible</p>
          <p class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">Freelance y proyectos</p>
        </UCard>
      </div>
    </div>

    <div class="flex-1">
      <UCard
        class="relative mx-auto max-w-lg overflow-hidden border shadow-2xl shadow-red-500/25 transition-colors"
        :class="
          isLight
            ? 'border-slate-200 bg-gradient-to-br from-white via-slate-100 to-red-50'
            : 'border-white/10 bg-gradient-to-br from-white/10 via-black/10 to-red-500/10'
        "
        :ui="{ rounded: 'rounded-[32px]', body: { base: 'p-8 space-y-6 relative' } }"
      >
        <div class="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-red-500/20 blur-3xl" />
        <div class="absolute -bottom-10 -right-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div class="relative space-y-6">
          <div class="flex items-center justify-between">
            <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-300'">
              Perfil
            </p>
            <UBadge variant="soft" color="red" class="bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-100">
              Disponible
            </UBadge>
          </div>
          <div class="flex items-center gap-4">
            <UAvatar
              size="xl"
              src="https://avatars.githubusercontent.com/u/11875214?v=4"
              alt="Juan Miguel Ruiz Supelano"
              class="border border-white/20 shadow-lg shadow-red-500/30"
              :ui="{ rounded: 'rounded-3xl' }"
            />
            <div>
              <p class="text-lg font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">
                Juan Miguel Ruiz Supelano
              </p>
              <p class="text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
                Developer - Designer - Est. Ing. Sistemas
              </p>
            </div>
          </div>

          <div class="space-y-3 text-sm" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
            <UCard
              v-for="item in [
                { title: 'Frontend', value: 'Vue - Nuxt - Tailwind' },
                { title: 'Backend', value: 'Node - MongoDB' },
                { title: 'UI Motion', value: 'GSAP - Microinteracciones' }
              ]"
              :key="item.title"
              class="flex items-center justify-between transition-colors"
              :class="isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-black/30'"
              :ui="{ rounded: 'rounded-2xl', body: { base: 'px-4 py-3 w-full flex items-center justify-between' } }"
            >
              <p>{{ item.title }}</p>
              <span class="text-red-500">{{ item.value }}</span>
            </UCard>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
