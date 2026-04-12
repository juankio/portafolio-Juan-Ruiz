<script setup>
import * as uiLocales from '@nuxt/ui/locale'
import { useI18n } from '~/composables/useI18n'

const { locale } = useI18n()
const availableLocales = [uiLocales.es, uiLocales.en]
const currentLocale = computed(() => availableLocales.find(item => item.code === locale.value) || uiLocales.en)
const { isLight } = useThemeMode()
const isBooting = ref(true)

// Inyectar script blocking en <head> del HTML — corre antes del primer paint
useHead({
  script: [
    {
      key: 'theme-init',
      innerHTML: `(function(){try{if(localStorage.getItem('theme-mode')==='light'){document.documentElement.classList.add('theme-light')}}catch(e){}})()`,
    }
  ]
})

onMounted(() => {
  setTimeout(() => {
    isBooting.value = false
  }, 800)
})

</script>

<template>
  <UApp :locale="currentLocale">
    <NuxtLoadingIndicator color="var(--color-accent)" :height="3" />
    <Transition name="loader">
      <div v-if="isBooting" class="boot-loader" key="loader">
        <div class="boot-hero" aria-hidden="true">
          <img src="/snorlax-loader.png" alt="" />
        </div>
        <span class="boot-text">Cargando portafolio de Juan Miguel</span>
        <div class="boot-spinner" aria-hidden="true" />
      </div>
    </Transition>
    <div v-show="!isBooting">
      <NuxtLayout>
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
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
  gap: 16px;
  background: var(--color-wall);
  color: var(--color-text-primary);
  font-family: "Bangers", "Druk Text Wide Trial", "Druk Wide Trial", Inter, system-ui, sans-serif;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: background 0.3s ease, color 0.3s ease;
}
.boot-hero {
  width: 140px;
  filter: drop-shadow(0 12px 24px rgba(15, 23, 42, 0.4));
}
.boot-hero img {
  display: block;
  width: 100%;
  height: auto;
  animation: boot-float 2s ease-in-out infinite;
}
.boot-text {
  font-size: 0.8rem;
  text-align: center;
  max-width: min(320px, 80vw);
}
.boot-spinner {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-accent);
  animation: boot-spin 0.8s linear infinite;
}

.loader-leave-active {
  transition: opacity 0.4s ease;
}
.loader-leave-to {
  opacity: 0;
}

@keyframes boot-spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes boot-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-16px); }
}
</style>
