<script setup>
const props = defineProps({
  projects: {
    type: Array,
    default: () => []
  },
  pending: {
    type: Boolean,
    default: false
  },
  error: {
    type: Object,
    default: null
  },
  onRefresh: {
    type: Function,
    default: null
  }
})
</script>

<template>
  <section id="proyectos" class="mx-auto max-w-6xl px-6 py-16 sm:py-20">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.25em] text-slate-400">Proyectos</p>
        <h2 class="text-3xl font-semibold text-white sm:text-4xl">
          Repositorios vivos desde <span class="text-red-500">GitHub</span>
        </h2>
      </div>
      <div class="flex gap-3">
        <UButton
          v-if="onRefresh"
          size="sm"
          variant="outline"
          :loading="pending"
          class="border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
          @click="onRefresh && onRefresh()"
        >
          Actualizar
        </UButton>
        <UButton
          to="https://github.com/juankiu"
          target="_blank"
          size="sm"
          class="bg-red-500 text-black hover:bg-red-400"
        >
          GitHub
        </UButton>
      </div>
    </div>

    <div class="mt-8">
      <div v-if="error" class="rounded-3xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-100">
        Hubo un problema al traer los repos. Intenta nuevamente.
      </div>

      <div v-if="pending" class="grid gap-6 md:grid-cols-2">
        <div v-for="s in 4" :key="s" class="h-40 rounded-3xl border border-white/10 bg-white/5 animate-pulse" />
      </div>

      <div v-else-if="projects.length === 0" class="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
        Aun no hay proyectos para mostrar. Intenta actualizar o revisa mas tarde.
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.id"
          class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-red-500/20"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-red-500/0 via-white/0 to-white/5 opacity-0 transition duration-500 group-hover:opacity-100" />
          <div class="relative flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Repositorio</p>
              <h3 class="text-xl font-semibold text-white">{{ project.name }}</h3>
            </div>
            <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
              {{ project.language || 'Multi' }}
            </span>
          </div>

          <p class="relative mt-3 text-sm text-slate-300">
            {{ project.description || 'Repositorio en GitHub sin descripcion anadida.' }}
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span class="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1">
              <UIcon name="i-heroicons-star-20-solid" class="text-amber-400" />
              {{ project.stargazers_count ?? 0 }} stars
            </span>
            <span class="inline-flex items-center gap-1 rounded-full bg-black/30 px-3 py-1">
              <UIcon name="i-heroicons-calendar-days-20-solid" class="text-slate-300" />
              Actualizado {{ new Date(project.updated_at).toLocaleDateString() }}
            </span>
          </div>

          <div class="mt-5 flex flex-wrap gap-3">
            <UButton
              :to="project.html_url"
              target="_blank"
              size="sm"
              class="bg-red-500 text-black hover:bg-red-400"
            >
              Ver codigo
            </UButton>
            <UButton
              v-if="project.homepage"
              :to="project.homepage"
              target="_blank"
              size="sm"
              variant="outline"
              class="border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10"
            >
              Ver demo
            </UButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
