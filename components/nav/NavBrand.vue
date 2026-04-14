<script setup>
defineProps({
  isLight: { type: Boolean, default: false }
})
</script>

<template>
  <NuxtLink
    to="/"
    class="group flex flex-1 items-center gap-3 px-2 py-2 hover:bg-transparent lg:flex-none lg:shrink-0"
  >
    <!-- Tag icon -->
    <span
      class="nav-brand__icon flex h-11 w-11 shrink-0 items-center justify-center text-white transition-all duration-200 group-hover:scale-110 group-hover:rotate-[-3deg] sm:h-12 sm:w-12 lg:h-11 lg:w-11"
    >
      <UIcon name="i-heroicons-code-bracket-20-solid" class="h-6 w-6 sm:h-7 sm:w-7 lg:h-6 lg:w-6" />
    </span>

    <!-- Graffiti signature -->
    <span class="flex min-w-0 flex-1 flex-col leading-tight lg:flex-none">
      <span
        class="text-[0.7rem] font-marker uppercase tracking-[0.18em] text-[var(--color-accent)] opacity-80 sm:text-xs lg:text-[0.65rem]"
      >
        Juan Miguel
      </span>
      <span
        class="truncate text-lg font-extrabold uppercase tracking-[0.04em] text-spray sm:text-xl lg:text-base lg:tracking-[0.06em]"
        :class="isLight ? 'text-slate-700' : 'text-slate-100'"
      >
        Ruiz Supelano
      </span>
    </span>
  </NuxtLink>
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
