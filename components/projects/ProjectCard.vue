<script setup>
import { inject, ref } from 'vue'
import GraffitiTag from '~/components/graffiti/GraffitiTag.vue'
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import StreetButton from '~/components/ui/StreetButton.vue'

const props = defineProps({
  project: { type: Object, required: true },
  idx: { type: Number, default: 0 }
})

const isLight = inject('isLight', ref(false))
const { t } = useI18n()

const imageState = ref('local') // 'local' -> 'github' -> 'error'

const getPreviewImage = (project) => {
  if (imageState.value === 'local') return `/projects/${project.name}.png`
  return `https://opengraph.githubassets.com/1/${project.full_name}`
}

const handleImageError = () => {
  if (imageState.value === 'local') {
    imageState.value = 'github'
  } else {
    imageState.value = 'error'
  }
}
</script>

<template>
  <article
    :aria-labelledby="`project-title-${project.id}`"
    class="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-[var(--color-accent)]/50 animate-item opacity-0"
    :style="{
      animationDelay: `${idx * 0.06}s`
    }"
  >
    <!-- Thumbnail -->
    <div class="relative overflow-hidden aspect-video bg-[var(--color-surface)]">
      <!-- Imagen normal (se oculta si hay error) -->
      <img
        v-show="imageState !== 'error'"
        :src="getPreviewImage(project)"
        :alt="`Captura de pantalla del proyecto ${project.name}`"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        width="600"
        height="338"
        @error="handleImageError"
      />

      <!-- Fallback Graffiti cuando la imagen no carga -->
      <div 
        v-show="imageState === 'error'" 
        class="absolute inset-0 flex flex-col items-center justify-center bg-[#0f1115] border-b border-[var(--color-border)]"
      >
        <!-- Patrón de fondo estilo "pared" -->
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 16px 16px;"></div>
        
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[var(--color-accent)] opacity-80 mb-2 drop-shadow-md">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          <circle cx="12" cy="12" r="4"/>
        </svg>
        <span class="text-xs font-black uppercase tracking-widest text-[var(--color-accent)] opacity-70">
          No Signal
        </span>
      </div>

      <!-- Gradiente superpuesto -->
      <div
        class="absolute inset-0 bg-gradient-to-t opacity-60"
        :class="isLight ? 'from-white via-transparent' : 'from-slate-900 via-transparent'"
      />
      <!-- Language tag sticker -->
      <div class="absolute top-3 right-3">
        <GraffitiTag
          :text="project.language || 'Multi'"
          :index="idx"
          size="sm"
        />
      </div>
      <!-- Spray decoration -->
      <SpraySplatter
        class="absolute -bottom-4 -left-4"
        size="sm"
        :opacity="0.12"
      />
    </div>

    <div class="flex flex-1 flex-col gap-3 p-5">
      <div>
        <p class="text-xs uppercase tracking-[0.2em]" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
          {{ t('projects.repo') }}
        </p>
        <h3 :id="`project-title-${project.id}`" class="text-xl font-bold text-spray" :class="isLight ? 'text-slate-700' : 'text-white'">
          {{ project.name }}
        </h3>
      </div>

      <p class="text-sm leading-relaxed flex-1" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
        {{ project.description || t('projects.noDescription') }}
      </p>

      <div class="flex flex-wrap items-center gap-3 text-xs" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
        <span class="inline-flex items-center gap-1">
          <UIcon name="i-heroicons-star-20-solid" class="text-amber-400" />
          {{ project.stargazers_count ?? 0 }}
        </span>
        <span class="inline-flex items-center gap-1">
          <UIcon name="i-heroicons-calendar-days-20-solid" />
          <ClientOnly fallback="...">
            {{ new Date(project.updated_at).toLocaleDateString() }}
          </ClientOnly>
        </span>
      </div>

      <div class="flex flex-wrap gap-2 pt-1">
        <StreetButton
          :href="project.html_url"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          class="street-btn--sm"
          :aria-label="`${t('projects.viewCode')} del proyecto ${project.name}`"
        >
          {{ t('projects.viewCode') }}
        </StreetButton>
        <StreetButton
          v-if="project.homepage"
          :href="project.homepage"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          class="street-btn--sm"
          :aria-label="`${t('projects.viewDemo')} del proyecto ${project.name}`"
        >
          {{ t('projects.viewDemo') }}
        </StreetButton>
      </div>
    </div>
  </article>
</template>
