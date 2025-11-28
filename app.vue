<script setup>
useHead({
  htmlAttrs: { lang: 'es' },
  bodyAttrs: {
    class: 'bg-[#0c0c0d] text-slate-100 font-[Inter,system-ui,sans-serif] antialiased'
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
