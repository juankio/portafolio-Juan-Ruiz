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
    class="group flex shrink-0 items-center gap-3 rounded-xl px-2 py-2 hover:bg-transparent"
  >
    <span
      class="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 bg-[var(--color-accent)] text-white"
    >
      <UIcon name="i-heroicons-user-20-solid" class="h-5 w-5" />
    </span>

    <span class="hidden min-w-0 flex-col leading-tight sm:flex">
      <span
        class="text-xs font-semibold uppercase tracking-[0.14em]"
        :class="isLight ? 'text-slate-500' : 'text-slate-400'"
      >
        Juan Miguel
      </span>
      <span
        class="truncate text-base font-extrabold uppercase tracking-[0.08em]"
        :class="isLight ? 'text-slate-800' : 'text-slate-100'"
      >
        Ruiz Supelano
      </span>
    </span>
  </UButton>
</template>
