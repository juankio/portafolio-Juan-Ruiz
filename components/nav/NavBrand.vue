<script setup>
defineProps({
  isLight: { type: Boolean, default: false }
})
</script>

<template>
  <UButton
    to="/"
    color="neutral"
    variant="ghost"
    class="group flex shrink-0 items-center gap-3 px-2 py-2 hover:bg-transparent"
  >
    <!-- Tag icon -->
    <span
      class="nav-brand__icon flex h-11 w-11 items-center justify-center text-white transition-all duration-200 group-hover:scale-110 group-hover:rotate-[-3deg]"
    >
      <UIcon name="i-heroicons-code-bracket-20-solid" class="h-6 w-6" />
    </span>

    <!-- Graffiti signature -->
    <span class="hidden min-w-0 flex-col leading-tight sm:flex">
      <span
        class="text-[0.65rem] font-marker uppercase tracking-[0.18em] text-[var(--color-accent)] opacity-70"
      >
        Juan Miguel
      </span>
      <span
        class="truncate text-base font-extrabold uppercase tracking-[0.06em] text-spray"
        :class="isLight ? 'text-slate-700' : 'text-slate-100'"
      >
        Ruiz Supelano
      </span>
    </span>
  </UButton>
</template>

<style scoped>
.nav-brand__icon {
  background: var(--color-accent);
  border-radius: 3px 8px 4px 10px;
  box-shadow: 2px 3px 0 rgba(0,0,0,0.3), 0 0 0 0 var(--color-accent);
  transition: all 0.2s var(--ease-spring);
}

.group:hover .nav-brand__icon {
  box-shadow: 3px 4px 0 rgba(0,0,0,0.25), 0 0 12px var(--color-accent-soft);
}
</style>
