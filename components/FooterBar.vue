<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <footer
    class="px-6 py-10 backdrop-blur border-t"
    :class="isLight ? 'border-slate-200 bg-white/80' : 'border-white/10 bg-black/60'"
  >
    <div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm" :class="isLight ? 'text-slate-700' : 'text-slate-300'">(c) {{ new Date().getFullYear() }} Juan Miguel Ruiz Supelano.</p>
        <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-500'">Construido con Nuxt - Vue - Tailwind - PWA.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <a
          href="https://github.com/juankio"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md border px-3.5 py-2 text-sm font-medium transition"
          :class="isLight ? 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50' : 'border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10'"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/juan-miguel-ruiz-supelano"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-md border px-3.5 py-2 text-sm font-medium transition"
          :class="isLight ? 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50' : 'border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10'"
        >
          LinkedIn
        </a>
        <a
          href="mailto:contacto@juanmiguel.dev"
          class="rounded-md border px-3.5 py-2 text-sm font-medium transition"
          :class="isLight ? 'border-slate-200 bg-white text-slate-900 hover:border-slate-300 hover:bg-slate-50' : 'border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10'"
        >
          Correo
        </a>
      </div>
    </div>
  </footer>
</template>
