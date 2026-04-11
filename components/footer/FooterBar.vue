<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <footer :class="isLight ? 'border-t border-slate-200 bg-gray-300/80 backdrop-blur' : 'border-t border-white/10 bg-black/60 backdrop-blur'">
    <UContainer class="py-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p class="text-sm" :class="isLight ? 'text-slate-700' : 'text-slate-300'">
            (c) {{ new Date().getFullYear() }} Juan Miguel Ruiz Supelano.
          </p>
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-500'">
            Construido con Nuxt - Vue - Tailwind - PWA.
          </p>
        </div>
        <div class="flex flex-wrap gap-3">
          <UButton
            variant="soft"
            color="neutral"
            to="https://github.com/juankio"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </UButton>
          <UButton
            variant="soft"
            color="neutral"
            to="https://www.linkedin.com/in/juan-miguel-ruiz-supelano"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </UButton>
          <UButton
            variant="soft"
            color="primary"
            to="mailto:contacto@juanmiguel.dev"
          >
            Correo
          </UButton>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
