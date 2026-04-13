<script setup>
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
import GraffitiTag from '~/components/graffiti/GraffitiTag.vue'
import SkeletonCard from '~/components/ui/SkeletonCard.vue'
import StreetButton from '~/components/ui/StreetButton.vue'

const props = defineProps({
  projects: { type: Array, default: () => [] },
  pending: { type: Boolean, default: false },
  error: { type: Object, default: null },
  onRefresh: { type: Function, default: null },
  isLight: { type: Boolean, default: false }
})

const { t } = useI18n()

const getOgImage = (name) => `https://opengraph.githubassets.com/1/juankio/${name}`
const getPreviewImage = (project) => {
  if (project.homepage) {
    return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(project.homepage)}?w=1200&h=675`
  }
  return getOgImage(project.name)
}
</script>

<template>
  <UContainer
    as="section"
    id="proyectos"
    class="relative py-14 sm:py-20"
  >
    <SpraySplatter class="absolute -top-6 -right-4" size="lg" :opacity="0.08" />

    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-400' : 'text-slate-500'">{{ t('projects.sectionTitle') }}</p>
        <h2 class="text-3xl font-bold text-spray sm:text-4xl" :class="isLight ? 'text-slate-700' : 'text-white'">
          {{ t('projects.headline') }}
          <span class="text-[var(--color-accent)]">{{ t('projects.headlineAccent') }}</span>
        </h2>
      </div>
      <div class="flex gap-3">
        <StreetButton
          v-if="onRefresh"
          variant="primary"
          class="street-btn--sm"
          :disabled="pending"
          @click="onRefresh && onRefresh()"
        >
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

    <div class="mt-10">
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

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(project, idx) in projects"
          :key="project.id"
          class="group relative flex flex-col overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_16px_var(--color-accent-soft)] animate-fade-in-up"
          :class="isLight ? 'border-[var(--color-border)] bg-[var(--color-surface-card)]' : 'border-[var(--color-border)] bg-[var(--color-surface-card)]'"
          :style="{
            borderRadius: '4px 12px 6px 10px',
            backdropFilter: 'blur(12px)',
            animationDelay: `${idx * 0.06}s`
          }"
        >
          <!-- Thumbnail -->
          <div class="relative overflow-hidden aspect-video">
            <NuxtImg
              :src="getPreviewImage(project)"
              :alt="project.name"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              format="webp"
              quality="80"
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
      </div>
    </div>
  </UContainer>
</template>
