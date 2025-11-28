<template>
  <footer class="border-t border-white/10 bg-black/60 px-6 py-10 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-slate-300">(c) {{ new Date().getFullYear() }} Juan Miguel Ruiz Supelano.</p>
        <p class="text-sm text-slate-500">Construido con Nuxt - Vue - Tailwind - PWA.</p>
      </div>
      <div class="flex flex-wrap gap-3">
        <UButton
          to="https://github.com/juankiu"
          target="_blank"
          size="sm"
          variant="outline"
          class="border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10"
        >
          GitHub
        </UButton>
        <UButton
          to="https://www.linkedin.com/in/juan-miguel-ruiz-supelano"
          target="_blank"
          size="sm"
          variant="outline"
          class="border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10"
        >
          LinkedIn
        </UButton>
        <UButton
          to="mailto:contacto@juanmiguel.dev"
          size="sm"
          variant="outline"
          class="border-white/30 bg-white/5 text-white hover:border-white/60 hover:bg-white/10"
        >
          Correo
        </UButton>
      </div>
    </div>
  </footer>
</template>
