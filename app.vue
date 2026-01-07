<script setup>
import * as uiLocales from '@nuxt/ui/locale'
import { useI18n } from '~/composables/useI18n'

const { locale } = useI18n()
const availableLocales = [uiLocales.es, uiLocales.en]
const currentLocale = computed(() => availableLocales.find(item => item.code === locale.value) || uiLocales.en)
const isBooting = ref(true)

onMounted(() => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isBooting.value = false
    })
  })
})

</script>

<template>
  <UApp :locale="currentLocale">
    <NuxtLoadingIndicator color="#ef4444" :height="3" />
    <div class="boot-loader" :class="{ 'boot-loader--hidden': !isBooting }">
      <div class="boot-hero" aria-hidden="true">
        <img src="/snorlax-loader.png" alt="" />
      </div>
      <span class="boot-text">Cargando portafolio de Juan Miguel</span>
      <div class="boot-spinner" aria-hidden="true" />
    </div>
    <div v-show="!isBooting">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<style scoped>
.boot-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(2, 6, 23, 0.85);
  color: #e2e8f0;
  font-family: "Bangers", "Druk Text Wide Trial", "Druk Wide Trial", Inter, system-ui, sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: opacity 200ms ease, visibility 200ms ease;
}
.boot-loader--hidden {
  opacity: 0;
  visibility: hidden;
}
.boot-hero {
  width: 160px;
  filter: drop-shadow(0 16px 30px rgba(15, 23, 42, 0.35));
}
.boot-hero img {
  display: block;
  width: 100%;
  height: auto;
  animation: boot-float 1.6s linear infinite;
  transform-origin: center bottom;
  will-change: transform;
  transform: translateZ(0);
}
.boot-text {
  font-size: 0.8rem;
  text-align: center;
  max-width: min(320px, 80vw);
}
.boot-spinner {
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  border: 4px solid rgba(148, 163, 184, 0.35);
  border-top-color: #ef4444;
  animation: boot-spin 0.9s linear infinite;
}
@keyframes boot-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes boot-float {
  0% { transform: translate3d(0, 0, 0); }
  25% { transform: translate3d(0, -10px, 0); }
  50% { transform: translate3d(0, -20px, 0); }
  75% { transform: translate3d(0, -10px, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
</style>
