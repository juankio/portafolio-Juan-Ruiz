<script setup lang="ts">
import { inject, ref } from 'vue'

const isLight = inject('isLight', ref(false))

const { t, locale } = useI18n()

const aboutSummary = computed(() => {
  const summary = t('about.summary')
  return Array.isArray(summary) ? summary : []
})
</script>

<template>
  <div class="about-poster relative overflow-hidden animate-item opacity-0">
    <div class="relative z-10 p-6 sm:p-7">
      <div class="flex items-start justify-between gap-4">
        <div class="flex items-center gap-4">
          <!-- Clean Avatar -->
          <div class="avatar-street group relative shrink-0">
            <!-- Foto -->
            <NuxtImg
              src="https://avatars.githubusercontent.com/u/74984894?v=4"
              alt="Juan Miguel Ruiz Supelano"
              width="80"
              height="80"
              class="avatar-img relative z-10 w-16 h-16 sm:w-20 sm:h-20 object-cover shadow-sm border border-[var(--color-border)]"
            />
          </div>
          <div class="space-y-0.5">
            <p class="text-lg font-bold" :class="isLight ? 'text-slate-800' : 'text-white'">{{ t('hero.name') }}</p>
            <p class="text-sm font-medium" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
              Developer · Designer · Est. Ing. Sistemas
            </p>
            <p class="text-xs" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
              Villavicencio, Colombia · Remoto
            </p>
          </div>
        </div>
        <!-- Availability as clean badge -->
        <span
          class="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--color-accent-soft)] text-[var(--color-accent)] shrink-0"
        >
          <span class="w-1.5 h-1.5 mr-1.5 rounded-full bg-[var(--color-accent)] animate-pulse"></span>
          {{ t('about.availability') }}
        </span>
      </div>

      <!-- Summary rows -->
      <div class="mt-6 space-y-2">
        <div
          v-for="(row, idx) in aboutSummary"
          :key="row.label"
          class="about-summary-row flex items-center justify-between px-4 py-3"
          :class="isLight ? 'bg-white/60' : 'bg-slate-900/60'"
        >
          <span class="text-sm font-medium" :class="isLight ? 'text-slate-600' : 'text-slate-300'">{{ row.label }}</span>
          <span class="text-sm font-bold text-[var(--color-accent)]">{{ row.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Clean card */
.about-poster {
  border: 1px solid var(--color-border-accent);
  border-radius: 16px;
  background: var(--color-surface);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.about-poster:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Summary rows */
.about-summary-row {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.about-summary-row:hover {
  border-color: var(--color-accent);
  background: var(--color-surface-elevated);
}

/* Avatar Clean Style */
.avatar-street {
  transition: all 0.3s ease;
}

.avatar-img {
  transition: all 0.4s ease;
  border-radius: 50%;
}

.avatar-street:hover .avatar-img {
  transform: scale(1.05);
  box-shadow: 0 0 0 2px var(--color-accent);
}
</style>
