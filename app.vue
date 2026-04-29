<script setup>
import * as uiLocales from '@nuxt/ui/locale'
import { useI18n } from '~/composables/useI18n'

const { locale } = useI18n()
const availableLocales = [uiLocales.es, uiLocales.en]
const currentLocale = computed(() => availableLocales.find(item => item.code === locale.value) || uiLocales.en)
const { isLight } = useThemeMode()

const lenisOptions = {
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.05,
  touchMultiplier: 1.8,
  lerp: 0.09,
}

// Inyectar script blocking en <head> del HTML — corre antes del primer paint
useHead({
  htmlAttrs: {
    lang: computed(() => locale.value || 'es'),
  },
  script: [
    {
      key: 'theme-init',
      innerHTML: `(function(){try{if(localStorage.getItem('theme-mode')==='light'){document.documentElement.classList.add('theme-light')}}catch(e){}})()`,
    }
  ]
})

</script>

<template>
  <UApp :locale="currentLocale">
    <AppLoader :is-light="isLight" />
    <NuxtLoadingIndicator color="var(--color-accent)" :height="3" />
    <VueLenis root :options="lenisOptions">
      <NuxtLayout>
        <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
      </NuxtLayout>
    </VueLenis>
  </UApp>
</template>

