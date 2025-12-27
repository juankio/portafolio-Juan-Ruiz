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

const { t } = useI18n()
</script>

<template>
  <UContainer
    as="section"
    id="proyectos"
    class="py-16 sm:py-20"
  >
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ t('projects.sectionTitle') }}</p>
        <h2 class="text-3xl font-semibold sm:text-4xl" :class="isLight ? 'text-slate-800' : 'text-slate-200'">
          {{ t('projects.headline') }} <span :class="isLight ? 'text-emerald-600' : 'text-red-500'">{{ t('projects.headlineAccent') }}</span>
        </h2>
      </div>
      <div class="flex gap-3">
        <UButton
          v-if="onRefresh"
          size="sm"
          variant="solid"
          :loading="pending"
          :class="
            isLight
              ? 'bg-[#10b981] text-slate-700 shadow-emerald-400/30 hover:bg-[#22c55e]'
              : 'bg-red-600 text-white shadow-red-500/30 hover:bg-red-500'
          "
          @click="onRefresh && onRefresh()"
        >
          {{ t('projects.refresh') }}
        </UButton>
        <UButton
          to="https://github.com/juankio"
          target="_blank"
          size="sm"
          variant="outline"
          :class="
            isLight
              ? 'border-emerald-300 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50'
              : 'border border-red-500/80 text-white hover:border-red-400 hover:bg-red-500/10'
          "
        >
          {{ t('projects.github') }}
        </UButton>
      </div>
    </div>

    <div class="mt-8">
      <UAlert
        v-if="error"
        color="error"
        variant="soft"
        class="rounded-3xl"
        :ui="{ body: { base: 'flex flex-col gap-2' } }"
      >
        {{ t('projects.error') }}
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
        {{ t('projects.empty') }}
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
          :card-class="isLight ? 'group relative overflow-hidden shadow-xl hover:-translate-y-1 hover:ring-emerald-400/25' : 'group relative overflow-hidden shadow-xl hover:-translate-y-1 hover:ring-red-500/25'"
        >
          <div
            :class="[
              'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition duration-500 group-hover:opacity-100',
              isLight ? 'from-emerald-300/0 via-gray-300/0 to-emerald-100/25' : 'from-red-500/0 via-gray-300/0 to-gray-300/5'
            ]"
          />
          <div class="relative flex items-start justify-between gap-3">
            <div>
              <p class="text-xs uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">{{ t('projects.repo') }}</p>
              <h3 class="text-xl font-semibold" :class="isLight ? 'text-slate-800' : 'text-slate-200'">{{ project.name }}</h3>
            </div>
            <UBadge
              variant="soft"
              color="neutral"
              class="px-3 py-1 text-xs font-semibold"
              :class="isLight ? 'bg-slate-100 text-slate-700' : 'bg-gray-300/10 text-slate-200 ring-1 ring-gray-300/10'"
            >
              {{ project.language || 'Multi' }}
            </UBadge>
          </div>

          <p class="relative text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
            {{ project.description || t('projects.noDescription') }}
          </p>

          <div class="flex flex-wrap items-center gap-3 text-xs" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            <UBadge
              variant="solid"
              color="neutral"
              class="inline-flex items-center gap-1 border-0"
              :class="isLight ? 'bg-slate-100 text-slate-700' : 'bg-black/30 text-slate-200'"
            >
              <UIcon name="i-heroicons-star-20-solid" class="text-amber-400" />
              {{ project.stargazers_count ?? 0 }} {{ t('projects.stars') }}
            </UBadge>
            <UBadge
              variant="solid"
              color="neutral"
              class="inline-flex items-center gap-1 border-0"
              :class="isLight ? 'bg-slate-100 text-slate-700' : 'bg-black/30 text-slate-200'"
            >
              <UIcon name="i-heroicons-calendar-days-20-solid" class="text-slate-300" />
              {{ t('projects.updated') }} {{ new Date(project.updated_at).toLocaleDateString() }}
            </UBadge>
          </div>

          <div class="flex flex-wrap gap-3">
            <UButton
              :to="project.html_url"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              :color="isLight ? 'success' : 'error'"
              variant="solid"
            >
              {{ t('projects.viewCode') }}
            </UButton>
            <UButton
              v-if="project.homepage"
              :to="project.homepage"
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="outline"
              :class="
            isLight
              ? 'border-emerald-300 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50'
              : 'border border-red-500/80 text-white hover:border-red-400 hover:bg-red-500/10'
          "
            >
              {{ t('projects.viewDemo') }}
            </UButton>
          </div>
        </GlowCard>
      </div>
    </div>
  </UContainer>
</template>
