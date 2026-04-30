<script setup lang="ts">
import { inject } from 'vue'
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'

const isLight = inject('isLight', false)
const { t } = useI18n()

defineEmits<{
  reset: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-5 py-10 text-center">
    <!-- Spray reveal check -->
    <div class="contact-form__success-icon">
      <svg viewBox="0 0 60 60" class="w-16 h-16">
        <circle cx="30" cy="30" r="28" fill="none" stroke="var(--color-accent)" stroke-width="2" opacity="0.3" />
        <circle cx="30" cy="30" r="28" fill="var(--color-accent-soft)" />
        <path
          d="M 18 30 L 26 38 L 42 22"
          fill="none"
          stroke="var(--color-accent)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <SpraySplatter class="absolute -top-4 -right-4" size="sm" :opacity="0.15" />
    </div>

    <h3 class="text-xl font-bold text-spray" :class="isLight ? 'text-slate-700' : 'text-white'">
      {{ t('contact.validation.success') }}
    </h3>
    <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'" style="letter-spacing: 0.03em">
      {{ t('contact.validation.successDesc') }}
    </p>
    <button
      type="button"
      class="border-sketchy px-5 py-2 text-sm font-bold transition-all hover:scale-105"
      :class="isLight ? 'text-slate-600' : 'text-slate-300'"
      @click="$emit('reset')"
    >
      {{ t('contact.form.sendAnother') }}
    </button>
  </div>
</template>

<style scoped>
/* Success icon */
.contact-form__success-icon {
  position: relative;
  animation: spray-reveal 0.6s var(--ease-spring) forwards;
}

@keyframes spray-reveal {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
