<script setup lang="ts">
import { inject, ref, computed } from 'vue'

const isLight = inject('isLight', ref(false))

const { t, locale } = useI18n()

const aboutSkills = computed(() => {
  const skills = t('about.skills')
  return Array.isArray(skills) ? skills : []
})
</script>

<template>
  <article class="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm animate-item opacity-0">
    <div class="relative z-10 p-6">
      <h3 class="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5 inline-block">
        {{ t('about.skillsTitle') }}
      </h3>

      <ul class="grid gap-4 sm:grid-cols-2 mt-4">
        <li
          v-for="(skill, idx) in aboutSkills"
          :key="skill.title"
          class="group relative flex flex-col p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-card)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-md"
        >
          <h4 class="text-sm font-semibold transition-colors duration-300 group-hover:text-[var(--color-accent)]" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
            {{ skill.title }}
          </h4>
          <p class="text-xs mt-1.5 leading-relaxed" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            {{ skill.copy }}
          </p>
        </li>
      </ul>
    </div>
  </article>
</template>
