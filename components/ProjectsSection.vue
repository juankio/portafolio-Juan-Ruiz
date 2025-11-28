<script setup>
import GlowCard from './GlowCard.vue'

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
  <UContainer
    as="section"
    id="proyectos"
    class="py-16 sm:py-20"
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
          :class="isLight ? 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50' : 'border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10'"
          @click="onRefresh && onRefresh()"
        >
          Actualizar
        </UButton>
        <UButton
          to="https://github.com/juankio"
          target="_blank"
          size="sm"
          color="red"
          variant="solid"
          class="text-black"
        >
          GitHub
        </UButton>
      </div>
    </div>

    <div class="mt-8">
      <UAlert
        v-if="error"
        color="red"
        variant="soft"
        class="rounded-3xl"
        :ui="{ body: { base: 'flex flex-col gap-2' } }"
      >
        Hubo un problema al traer los repos. Intenta nuevamente o revisa el rate limit de GitHub.
      </UAlert>

      <div v-if="pending" class="grid gap-6 md:grid-cols-2">
        <GlowCard
          v-for="s in 4"
          :key="s"
          :is-light="isLight"
          :glow="false"
          :float="true"
          :delay="s * 80"
          rounded="rounded-3xl"
          body-padding="p-6"
          body-class="h-40 animate-pulse"
          card-class="shadow-none"
        />
      </div>

      <GlowCard
        v-else-if="projects.length === 0"
        :is-light="isLight"
        :glow="false"
        :float="true"
        :delay="100"
        rounded="rounded-3xl"
        body-padding="p-6"
        body-class="text-slate-600 dark:text-slate-300"
        card-class="shadow-none"
      >
        Aun no hay proyectos para mostrar. Intenta actualizar o revisa mas tarde.
      </GlowCard>

      <div v-else class="grid gap-6 md:grid-cols-2">
        <GlowCard
          v-for="(project, idx) in projects"
          :key="project.id"
          :is-light="isLight"
          rounded="rounded-3xl"
          body-padding="p-6"
          body-class="space-y-4 relative"
          :float="true"
          :delay="idx * 100"
          card-class="group relative overflow-hidden shadow-xl hover:-translate-y-1 hover:ring-red-500/25"
        >
          <div
            class="absolute inset-0 bg-gradient-to-br from-red-500/0 via-white/0 to-white/5 opacity-0 transition duration-500 group-hover:opacity-100"
          />
          <div class="relative flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Repositorio</p>
              <h3 class="text-xl font-semibold" :class="isLight ? 'text-slate-900' : 'text-white'">{{ project.name }}</h3>
            </div>
            <UBadge
              variant="soft"
              :color="isLight ? 'gray' : 'white'"
              class="px-3 py-1 text-xs font-semibold"
              :class="isLight ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-slate-200 ring-1 ring-white/10'"
            >
              {{ project.language || 'Multi' }}
            </UBadge>
          </div>

          <p class="relative text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
            {{ project.description || 'Repositorio en GitHub sin descripcion anadida.' }}
          </p>

          <div class="flex flex-wrap items-center gap-3 text-xs" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            <UBadge
              variant="solid"
              color="gray"
              class="inline-flex items-center gap-1 border-0"
              :class="isLight ? 'bg-slate-100 text-slate-700' : 'bg-black/30 text-slate-200'"
            >
              <UIcon name="i-heroicons-star-20-solid" class="text-amber-400" />
              {{ project.stargazers_count ?? 0 }} stars
            </UBadge>
            <UBadge
              variant="solid"
              color="gray"
              class="inline-flex items-center gap-1 border-0"
              :class="isLight ? 'bg-slate-100 text-slate-700' : 'bg-black/30 text-slate-200'"
            >
              <UIcon name="i-heroicons-calendar-days-20-solid" class="text-slate-300" />
              Actualizado {{ new Date(project.updated_at).toLocaleDateString() }}
            </UBadge>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton
              :to="project.html_url"
              target="_blank"
              size="sm"
              color="red"
              variant="solid"
              class="text-black"
            >
              Ver codigo
            </UButton>
            <UButton
              v-if="project.homepage"
              :to="project.homepage"
              target="_blank"
              size="sm"
              variant="outline"
              :class="isLight ? 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50' : 'border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10'"
            >
              Ver demo
            </UButton>
          </div>
        </GlowCard>
      </div>
    </div>
  </UContainer>
</template>
