<script setup>
import { inject, ref, watch } from 'vue'
import SkeletonCard from '~/components/ui/SkeletonCard.vue'
import ProjectCard from './ProjectCard.vue'

const props = defineProps({
  projects: { type: Array, default: () => [] },
  pending: { type: Boolean, default: false },
  error: { type: Object, default: null }
})

const isLight = inject('isLight', ref(false))
const { t, locale } = useI18n()

// Force re-animation when data arrives
watch(() => props.pending, (isPending) => {
  if (!isPending && process.client) {
    setTimeout(() => {
      const trigger = document.querySelector('#proyectos .projects-grid-container')
      if (trigger) {
        trigger.classList.remove('is-animated')
        trigger.setAttribute('data-force-reanimate', 'true')
        
        // Disparar un evento de scroll fake para que el observer de Anime.js lo capture
        window.dispatchEvent(new Event('scroll'))
      }
    }, 50)
  }
})
</script>

<template>
  <div class="mt-8 sm:mt-10 lg:mt-14 projects-grid-container projects-animate-trigger animate-group relative min-h-[400px]">
    <transition name="fade" mode="out-in">
      <UAlert v-if="error" key="error" color="error" variant="soft" class="rounded-2xl animate-item">
        {{ t('projects.error') }}
      </UAlert>

      <div v-else-if="pending" key="pending" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 absolute inset-0 w-full">
        <SkeletonCard v-for="s in 6" :key="s" variant="project" :is-light="isLight" class="animate-item" />
      </div>

      <div
        v-else-if="projects.length === 0"
        key="empty"
        class="rounded-2xl border-sketchy px-6 py-10 text-center animate-item w-full"
        :class="isLight ? 'text-slate-500' : 'text-slate-400'"
      >
        {{ t('projects.empty') }}
      </div>

      <div v-else key="grid" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
        <ProjectCard 
          v-for="(project, idx) in projects" 
          :key="project.id" 
          :project="project" 
          :idx="idx" 
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
