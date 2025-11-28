<template>
  <section id="sobre-mi" class="mx-auto max-w-6xl px-6 py-16 sm:py-20">
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="space-y-4">
        <p class="text-sm uppercase tracking-[0.25em] text-slate-400">Sobre mi</p>
        <h2 class="text-3xl font-semibold text-white sm:text-4xl">
          Diseno y desarrollo <span class="text-red-500">productos</span> digitales que se sienten vivos.
        </h2>
        <p class="text-lg text-slate-300">
          Soy Juan Miguel Ruiz Supelano, desarrollador y disenador que estudia Ingenieria de Sistemas.
          Creo interfaces limpias, rapidas y con una dosis justa de brutalismo moderno.
        </p>
        <div class="flex flex-wrap gap-3">
          <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-slate-200">Frontend</span>
          <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-slate-200">UX/UI</span>
          <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-slate-200">PWAs</span>
          <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-sm text-slate-200">Animacion</span>
        </div>
      </div>

      <div class="space-y-6">
        <div class="flex items-center gap-5 rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-lg shadow-white/10">
          <img
            src="https://avatars.githubusercontent.com/u/11875214?v=4"
            alt="Juan Miguel Ruiz Supelano"
            class="h-24 w-24 rounded-3xl border border-white/20 object-cover shadow-lg shadow-red-500/30"
          />
          <div class="space-y-1">
            <p class="text-xl font-semibold text-white">Juan Miguel Ruiz Supelano</p>
            <p class="text-sm text-slate-300">Desarrollador - Disenador - Estudiante de Ing. Sistemas</p>
            <p class="text-sm text-slate-400">Bogota, Colombia - Remoto</p>
          </div>
        </div>

        <div class="rounded-[28px] border border-white/10 bg-black/40 p-6 shadow-lg shadow-red-500/10">
          <p class="text-sm uppercase tracking-[0.25em] text-slate-400">Habilidades</p>
          <div class="mt-4 grid gap-3 sm:grid-cols-2">
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p class="font-semibold text-white">Frontend y UI</p>
              <p class="mt-2 text-slate-300">Vue, Nuxt, Tailwind, GSAP, accesibilidad, diseno responsivo.</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p class="font-semibold text-white">Backend y datos</p>
              <p class="mt-2 text-slate-300">Node.js, MongoDB, APIs REST, despliegues rapidos y seguros.</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p class="font-semibold text-white">Experiencia de producto</p>
              <p class="mt-2 text-slate-300">Microinteracciones, PWAs, rendimiento, optimizacion de SEO.</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              <p class="font-semibold text-white">Herramientas</p>
              <p class="mt-2 text-slate-300">Figma, GitHub, Nuxt UI, SendGrid, CI/CD ligero.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
