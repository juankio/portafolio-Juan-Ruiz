<script setup>
import GlowCard from './GlowCard.vue'

const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const { t } = useI18n()

const aboutChips = computed(() => {
  const chips = t('about.chips')
  return Array.isArray(chips) ? chips : []
})

const aboutSummary = computed(() => {
  const summary = t('about.summary')
  return Array.isArray(summary) ? summary : []
})

const aboutSkills = computed(() => {
  const skills = t('about.skills')
  return Array.isArray(skills) ? skills : []
})
</script>

<template>
  <UContainer
    as="section"
    id="sobre-mi"
    class="py-10 sm:py-14"
  >
    <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div class="space-y-4">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          {{ t('about.sectionTitle') }}
        </p>
        <h2 class="text-3xl font-semibold sm:text-4xl" :class="isLight ? 'text-slate-800' : 'text-slate-200'">
          {{ t('about.headline.lead') }}
          <span :class="isLight ? 'text-emerald-600' : 'text-red-500'">{{ t('about.headline.accent') }}</span>
          {{ t('about.headline.tail') }}
        </h2>
        <p class="text-lg" :class="isLight ? 'text-slate-600' : 'text-slate-400'">
          {{ t('about.intro') }}
        </p>
        <div class="flex flex-wrap gap-3">
          <UBadge
            v-for="chip in aboutChips"
            :key="chip"
            variant="outline"
            color="neutral"
            class="text-sm"
            :class="isLight ? 'border-slate-200 bg-gray-300 text-slate-800' : 'border-white/15 bg-gray-300/5 text-slate-200'"
          >
            {{ chip }}
          </UBadge>
        </div>
      </div>

      <div class="space-y-6">
        <GlowCard
          :is-light="isLight"
          rounded="rounded-[32px]"
          body-padding="p-6 sm:p-7 lg:p-8"
          body-class="space-y-5"
          :float="true"
          :delay="0"
          :card-class="isLight ? 'shadow-[0_25px_80px_-35px_rgba(16,185,129,0.35)]' : 'shadow-[0_25px_80px_-35px_rgba(248,113,113,0.45)]'"
        >
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-4">
              <UAvatar
                size="2xl"
                src="https://avatars.githubusercontent.com/u/11875214?v=4"
                alt="Juan Miguel Ruiz Supelano"
                :class="isLight ? 'border border-emerald-100 shadow-lg shadow-emerald-300/40' : 'border border-white/15 shadow-lg shadow-red-500/30'"
                :ui="{ rounded: 'rounded-3xl' }"
              />
              <div class="space-y-1">
                <p class="text-xl font-semibold" :class="isLight ? 'text-slate-800' : 'text-slate-200'">Juan Miguel Ruiz Supelano</p>
                <p class="text-sm" :class="isLight ? 'text-slate-600' : 'text-slate-400'">Developer - Designer - Est. Ing. Sistemas</p>
                <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Villavicencio, Colombia · Remoto</p>
              </div>
            </div>
            <UBadge
              :color="isLight ? 'success' : 'error'"
              variant="outline"
              class="rounded-full px-4 py-2 text-sm font-semibold"
              :class="
                isLight
                  ? 'border-emerald-300 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50'
                  : 'border border-red-500/80 text-white hover:border-red-400 hover:bg-red-500/10'
              "
            >
              {{ t('about.availability') }}
            </UBadge>
          </div>

          <div class="space-y-3">
            <GlowCard
              v-for="(row, idx) in aboutSummary"
              :key="row.label"
              :is-light="isLight"
              rounded="rounded-2xl"
              body-padding="px-5 py-4"
              body-class="flex items-center justify-between"
              :float="true"
              :delay="idx * 120"
              :card-class="isLight ? 'shadow-[0_20px_55px_-42px_rgba(16,185,129,0.55)]' : 'shadow-[0_20px_55px_-42px_rgba(248,113,113,0.8)]'"
            >
              <span class="text-base font-medium" :class="isLight ? 'text-slate-800' : 'text-slate-200'">{{ row.label }}</span>
              <span class="text-base font-semibold" :class="isLight ? 'text-emerald-600' : 'text-red-500'">{{ row.value }}</span>
            </GlowCard>
          </div>
        </GlowCard>

        <GlowCard
          :is-light="isLight"
          rounded="rounded-[28px]"
          body-padding="p-6"
          body-class="space-y-4"
          :float="true"
          :card-class="isLight ? 'shadow-[0_25px_80px_-40px_rgba(16,185,129,0.35)]' : 'shadow-[0_25px_80px_-40px_rgba(248,113,113,0.45)]'"
        >
          <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            {{ t('about.skillsTitle') }}
          </p>
          <div class="grid gap-3 sm:grid-cols-2">
            <GlowCard
              v-for="(skill, idx) in aboutSkills"
              :key="skill.title"
              :delay="idx * 120"
              :is-light="isLight"
              rounded="rounded-2xl"
              body-padding="px-4 py-4"
              body-class="text-sm transition-colors"
              :float="true"
              card-class="shadow-[0_20px_55px_-42px_rgba(248,113,113,0.8)]"
            >
              <p class="font-semibold" :class="isLight ? 'text-slate-800' : 'text-slate-200'">{{ skill.title }}</p>
              <p :class="isLight ? 'text-slate-600' : 'text-slate-400'">{{ skill.copy }}</p>
            </GlowCard>
          </div>
        </GlowCard>
      </div>
    </div>
  </UContainer>
</template>
