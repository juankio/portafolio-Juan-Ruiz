<script setup>
import { inject, ref } from 'vue'
import StreetButton from '~/components/ui/StreetButton.vue'
import { animate, stagger } from 'animejs'

const props = defineProps({
  pending: { type: Boolean, default: false },
  onRefresh: { type: Function, default: null }
})

const isLight = inject('isLight', ref(false))
const { t } = useI18n()

// Splitting text specifically for this component's headline
useTextSplit('.split-text-projects', { stagger: 15, duration: 700 })

const handleRefresh = async () => {
  if (props.pending || !props.onRefresh) return
  
  // Ocultar tarjetas actuales
  const cards = document.querySelectorAll('.animate-item:not(.skel-card)')
  if (cards.length) {
    animate({
      targets: cards,
      opacity: [1, 0],
      translateY: [0, 20],
      duration: 300,
      easing: 'easeInQuad',
      delay: stagger(50)
    })
    
    // Esperar a que termine la animación antes de hacer fetch
    await new Promise(r => setTimeout(r, 300 + (cards.length * 50)))
  }
  
  // Ejecutar fetch
  await props.onRefresh()
  
  // Cuando termine el fetch, useScrollAnimation y ProjectsGrid se encargarán de mostrarlas
  // Necesitamos forzar la reanimación quitando la clase is-animated
  setTimeout(() => {
    const trigger = document.querySelector('#proyectos .projects-animate-trigger:last-of-type')
    if (trigger) {
      trigger.classList.remove('is-animated')
      trigger.setAttribute('data-force-reanimate', 'true')
    }
  }, 100)
}
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between projects-animate-trigger animate-group">
    <div class="animate-item opacity-0">
      <p class="text-sm uppercase tracking-[0.25em] mb-2" :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ t('projects.sectionTitle') }}</p>
      <h2 class="text-3xl font-bold text-spray sm:text-4xl lg:text-5xl split-text-projects text-balance" :class="isLight ? 'text-slate-700' : 'text-white'">
        {{ t('projects.headline') }}
        <span class="text-[var(--color-accent)]">{{ t('projects.headlineAccent') }}</span>
      </h2>
    </div>
    <div class="flex gap-3 animate-item opacity-0">
      <StreetButton
        v-if="onRefresh"
        variant="primary"
        class="street-btn--sm"
        :disabled="pending"
        @click="handleRefresh"
      >
        <UIcon v-if="pending" name="i-heroicons-arrow-path-20-solid" class="animate-spin mr-1" />
        {{ t('projects.refresh') }}
      </StreetButton>
      <StreetButton
        href="https://github.com/juankio"
        target="_blank"
        rel="noopener noreferrer"
        variant="ghost"
        class="street-btn--sm"
      >
        {{ t('projects.github') }}
      </StreetButton>
    </div>
  </div>
</template>
