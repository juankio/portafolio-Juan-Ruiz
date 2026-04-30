<script setup>
const { t } = useI18n()
</script>

<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:p-4 focus:bg-[var(--color-accent)] focus:text-white focus:font-bold focus:top-2 focus:left-2 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-4 focus:ring-white"
  >
    {{ t('nav.skipToContent') }}
  </a>
</template>
