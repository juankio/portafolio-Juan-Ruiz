<script setup>
import * as uiLocales from '@nuxt/ui/locale'
import { useI18n } from '~/composables/useI18n'

const { locale } = useI18n()
const availableLocales = [uiLocales.es, uiLocales.en]
const currentLocale = computed(() => availableLocales.find(item => item.code === locale.value) || uiLocales.en)


</script>

<template>
  <UApp :locale="currentLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
