<template>
  <main class="min-h-screen bg-slate-950 text-slate-50">
    <section class="mx-auto flex max-w-4xl flex-col gap-6 px-6 py-16 lg:py-24">
      <p class="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Index</p>
      <h1 class="text-4xl font-semibold leading-tight lg:text-5xl">
        Portafolio listo para construir
      </h1>
      <p class="text-lg text-slate-300">
        Base limpia para tu sitio. Edita esta pagina y agrega las secciones que necesites sin el header de demo.
      </p>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p class="text-sm font-semibold text-slate-200">Siguientes pasos</p>
          <ul class="mt-3 space-y-1 text-sm text-slate-400">
            <li>Agrega secciones como hero, proyectos y contacto.</li>
            <li>Crea componentes reutilizables en <code>app/components</code>.</li>
            <li>Ajusta estilos globales en <code>assets/css/tailwind.css</code>.</li>
          </ul>
        </div>

        <div class="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p class="text-sm font-semibold text-slate-200">Notas rapidas</p>
          <ul class="mt-3 space-y-1 text-sm text-slate-400">
            <li>Usa <code>@nuxt/ui</code> para componentes y layout.</li>
            <li>Define metadata de la pagina con <code>definePageMeta</code> si la necesitas.</li>
            <li>Mantener el app limpio ayuda a iterar mas rapido.</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>
