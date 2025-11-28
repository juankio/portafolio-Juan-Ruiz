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
  },
  isLight: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <section
    id="proyectos"
    class="mx-auto max-w-6xl px-6 py-16 sm:py-20"
  >
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Proyectos</p>
        <h2 class="text-3xl font-semibold sm:text-4xl" :class="isLight ? 'text-slate-900' : 'text-white'">
          Repositorios vivos desde <span class="text-red-500">GitHub</span>
        </h2>
      </div>
      <div class="flex gap-3">
        <UButton
          v-if="onRefresh"
          size="sm"
          variant="outline"
          :loading="pending"
          class="transition"
          :class="isLight ? 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50' : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'"
          @click="onRefresh && onRefresh()"
        >
          Actualizar
        </UButton>
        <UButton
          to="https://github.com/juankio"
          target="_blank"
          size="sm"
          class="bg-red-500 text-black hover:bg-red-400"
        >
          GitHub
        </UButton>
      </div>
    </div>

    <div class="mt-8">
      <div
        v-if="error"
        class="rounded-3xl border p-4 text-sm"
        :class="isLight ? 'border-red-200 bg-red-50 text-red-700' : 'border-red-500/40 bg-red-500/10 text-red-100'"
      >
        Hubo un problema al traer los repos. Intenta nuevamente o revisa el rate limit de GitHub.
      </div>

      <div v-if="pending" class="grid gap-6 md:grid-cols-2">
        <div
          v-for="s in 4"
          :key="s"
          class="h-40 rounded-3xl border animate-pulse"
          :class="isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5'"
        />
      </div>

      <div
        v-else-if="projects.length === 0"
        class="rounded-3xl border p-6"
        :class="isLight ? 'border-slate-200 bg-white text-slate-600' : 'border-white/10 bg-white/5 text-slate-300'"
      >
        Aun no hay proyectos para mostrar. Intenta actualizar o revisa mas tarde.
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2">
        <article
          v-for="project in projects"
          :key="project.id"
          class="group relative overflow-hidden rounded-3xl border p-6 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-red-500/20"
          :class="isLight ? 'border-slate-200 bg-white shadow-slate-200/80' : 'border-white/10 bg-white/5 shadow-black/20'"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-red-500/0 via-white/0 to-white/5 opacity-0 transition duration-500 group-hover:opacity-100"
          />
          <div class="relative flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Repositorio</p>
              <h3 class="text-xl font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">{{ project.name }}</h3>
            </div>
            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-slate-200'"
            >
              {{ project.language || 'Multi' }}
            </span>
          </div>

          <p class="relative mt-3 text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
            {{ project.description || 'Repositorio en GitHub sin descripcion anadida.' }}
          </p>

          <div class="mt-4 flex flex-wrap items-center gap-3 text-xs" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            <span
              class="inline-flex items-center gap-1 rounded-full px-3 py-1"
              :class="isLight ? 'bg-slate-100' : 'bg-black/30'"
            >
              <UIcon name="i-heroicons-star-20-solid" class="text-amber-400" />
              {{ project.stargazers_count ?? 0 }} stars
            </span>
            <span
              class="inline-flex items-center gap-1 rounded-full px-3 py-1"
              :class="isLight ? 'bg-slate-100' : 'bg-black/30'"
            >
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
              class="transition"
              :class="isLight ? 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50' : 'border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10'"
            >
              Ver demo
            </UButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
