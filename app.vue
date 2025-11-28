<script setup>
useHead({
  htmlAttrs: { lang: 'es' },
  bodyAttrs: {
    class: 'font-[Inter,system-ui,sans-serif] antialiased'
  },
  meta: [
    { name: 'theme-color', content: '#0f0f10' },
    { name: 'format-detection', content: 'telephone=no' }
  ]
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
