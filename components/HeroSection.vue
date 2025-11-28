<script setup>
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
  <section
    id="inicio"
    class="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 sm:py-20 lg:flex-row lg:items-center lg:py-28"
  >
    <div class="absolute inset-0 -z-10">
      <div class="absolute left-10 top-10 h-48 w-48 rounded-full bg-red-500/20 blur-3xl" />
      <div class="absolute right-10 top-24 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
      <div class="absolute -bottom-10 left-1/3 h-60 w-60 rounded-full bg-red-500/10 blur-3xl" />
    </div>

    <div class="flex-1 space-y-6">
      <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 shadow-sm shadow-red-500/20">
        <span class="inline-flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
        Disponible para nuevos retos
      </div>

      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-400">Juan Miguel Ruiz Supelano</p>
        <h1 class="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
          Construyo experiencias web <span class="text-red-500">rapidas</span> y
          <span class="text-red-500">intencionales</span>.
        </h1>
        <p class="max-w-2xl text-lg text-slate-300">
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
          to="#proyectos"
          size="lg"
          class="bg-red-500 text-black shadow-lg shadow-red-500/30 transition hover:-translate-y-0.5 hover:bg-red-400"
        >
          Ver proyectos
        </UButton>
        <UButton
          to="#contacto"
          size="lg"
          variant="outline"
          class="border-white/20 bg-white/5 text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10"
        >
          Hablemos
        </UButton>
      </div>

      <div class="grid gap-4 sm:grid-cols-3">
        <div class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm shadow-white/10">
          <p class="text-sm text-slate-400">Especialidad</p>
          <p class="text-lg font-semibold text-white">Nuxt - Vue - PWA</p>
        </div>
        <div class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm shadow-white/10">
          <p class="text-sm text-slate-400">Stack visual</p>
          <p class="text-lg font-semibold text-white">Tailwind - Animaciones suaves</p>
        </div>
        <div class="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-sm shadow-white/10">
          <p class="text-sm text-slate-400">Disponible</p>
          <p class="text-lg font-semibold text-white">Freelance y proyectos</p>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <div class="relative mx-auto max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-black/10 to-red-500/10 p-8 shadow-2xl shadow-red-500/25">
        <div class="absolute -left-16 -top-16 h-32 w-32 rounded-full bg-red-500/20 blur-3xl" />
        <div class="absolute -bottom-10 -right-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div class="relative space-y-6">
          <div class="flex items-center justify-between">
            <p class="text-sm uppercase tracking-[0.25em] text-slate-300">Perfil</p>
            <span class="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-100">Disponible</span>
          </div>
          <div class="flex items-center gap-4">
            <img
              src="https://avatars.githubusercontent.com/u/11875214?v=4"
              alt="Juan Miguel Ruiz Supelano"
              class="h-20 w-20 rounded-3xl border border-white/20 object-cover shadow-lg shadow-red-500/30"
            />
            <div>
              <p class="text-lg font-semibold text-white">Juan Miguel Ruiz Supelano</p>
              <p class="text-sm text-slate-300">Developer - Designer - Est. Ing. Sistemas</p>
            </div>
          </div>

          <div class="space-y-3 text-sm text-slate-200">
            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <p>Frontend</p>
              <span class="text-red-400">Vue - Nuxt - Tailwind</span>
            </div>
            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <p>Backend</p>
              <span class="text-red-400">Node - MongoDB</span>
            </div>
            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <p>UI Motion</p>
              <span class="text-red-400">GSAP - Microinteracciones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
