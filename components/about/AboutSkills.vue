<script setup lang="ts">
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'

defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const { t, locale } = useI18n()

const aboutSkills = computed(() => {
  const skills = t('about.skills')
  return Array.isArray(skills) ? skills : []
})
</script>

<template>
  <div class="about-skills-wall relative overflow-hidden animate-item opacity-0">
    <SpraySplatter class="absolute bottom-4 left-2" size="md" :opacity="0.05" />

    <div class="relative z-10 p-6">
      <span
        class="tag-sticker text-xs uppercase tracking-widest mb-5 inline-block"
        style="transform: rotate(-1deg)"
      >
        {{ t('about.skillsTitle') }}
      </span>

      <div class="grid gap-3 sm:grid-cols-2 mt-4" :key="`skills-${locale}`">
        <div
          v-for="(skill, idx) in aboutSkills"
          :key="skill.title"
          class="about-skill-card group"
          :style="{ '--card-rotate': `${idx % 2 === 0 ? -0.8 : 0.6}deg` }"
        >
          <p class="text-sm font-bold text-spray" :class="isLight ? 'text-slate-600' : 'text-slate-200'">
            {{ skill.title }}
          </p>
          <p class="text-xs mt-1 leading-relaxed" :class="isLight ? 'text-slate-500' : 'text-slate-400'" style="letter-spacing: 0.03em">
            {{ skill.copy }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Skills wall — solid on the wall */
.about-skills-wall {
  border: 2px solid var(--color-border-accent);
  border-radius: 6px 4px 10px 5px;
  background: var(--color-surface);
  box-shadow: var(--shadow-glow);
}

/* Skill cards */
.about-skill-card {
  padding: 0.875rem 1rem;
  border: 1px dashed var(--color-border-accent);
  border-radius: 3px 8px 5px 10px;
  background: var(--color-surface);
  transform: rotate(var(--card-rotate, 0deg));
  transition: all 0.3s var(--ease-spring);
}

.about-skill-card:hover {
  transform: rotate(0deg) scale(1.02);
  border-color: var(--color-accent);
  box-shadow: var(--shadow-neon);
}
</style>
