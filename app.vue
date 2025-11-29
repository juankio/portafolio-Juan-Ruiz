<script setup>
import * as uiLocales from '@nuxt/ui/locale'
import { useI18n } from '~/composables/useI18n'

const { locale } = useI18n()
const availableLocales = [uiLocales.es, uiLocales.en]
const currentLocale = computed(() => availableLocales.find(item => item.code === locale.value) || uiLocales.en)

useHead(() => ({
  htmlAttrs: { lang: currentLocale.value.code },
  bodyAttrs: {
    class: 'font-[Inter,system-ui,sans-serif] antialiased'
  },
  meta: [
    { name: 'theme-color', content: '#0f0f10' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
}))
</script>

<template>
  <UApp :locale="currentLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
