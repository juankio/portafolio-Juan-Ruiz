<script setup>
import { inject, ref } from 'vue'
import SkeletonCard from '~/components/ui/SkeletonCard.vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  projects: { type: Array, default: () => [] },
  pending: { type: Boolean, default: false },
  error: { type: Object, default: null }
})

const isLight = inject('isLight', ref(false))
const { t, locale } = useI18n()
</script>

<template>
  <div class="mt-8 sm:mt-10 lg:mt-14">
    <UAlert v-if="error" color="error" variant="soft" class="rounded-2xl">
      {{ t('projects.error') }}
    </UAlert>

    <div v-if="pending" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <SkeletonCard v-for="s in 6" :key="s" variant="project" :is-light="isLight" />
    </div>

    <div
      v-else-if="projects.length === 0"
      class="rounded-2xl border-sketchy px-6 py-10 text-center"
      :class="isLight ? 'text-slate-500' : 'text-slate-400'"
    >
      {{ t('projects.empty') }}
    </div>

    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 projects-animate-trigger animate-group" :key="`projects-${locale}`">
      <ProjectCard 
        v-for="(project, idx) in projects" 
        :key="project.id" 
        :project="project" 
        :idx="idx" 
      />
    </div>
  </div>
</template>
