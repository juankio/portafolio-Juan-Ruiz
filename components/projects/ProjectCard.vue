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

const getPreviewImage = (project) => {
  // Intentar mostrar la web real si existe, sino el repo
  const targetUrl = project.homepage || project.html_url
  // Usar Thum.io que es gratuito y no bloquea CORS como mshots
  return `https://image.thum.io/get/width/600/crop/800/${targetUrl}`
}
</script>

<template>
  <article
    class="group relative flex flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 hover:border-[var(--color-accent)]/50 animate-item opacity-0"
    :style="{
      animationDelay: `${idx * 0.06}s`
    }"
  >
    <!-- Thumbnail -->
    <div class="relative overflow-hidden aspect-video">
      <img
        :src="getPreviewImage(project)"
        :alt="project.name"
        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        width="600"
        height="338"
      />
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
        <h3 class="text-xl font-bold text-spray" :class="isLight ? 'text-slate-700' : 'text-white'">
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
          {{ new Date(project.updated_at).toLocaleDateString() }}
        </span>
      </div>

      <div class="flex flex-wrap gap-2 pt-1">
        <StreetButton
          :href="project.html_url"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          class="street-btn--sm"
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
        >
          {{ t('projects.viewDemo') }}
        </StreetButton>
      </div>
    </div>
  </article>
</template>
