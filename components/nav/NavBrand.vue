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
    class="nav-brand group flex shrink-0 items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-transparent"
  >
    <span
      class="flex h-10 w-10 items-center justify-center rounded-xl ring-1 transition-transform duration-200 group-hover:scale-[1.04]"
      :class="isLight
        ? 'bg-gradient-to-br from-emerald-500 to-lime-300 ring-emerald-300/80 text-slate-900'
        : 'bg-gradient-to-br from-red-500 via-red-400 to-amber-300 ring-red-300/70 text-slate-900'"
    >
      <UIcon name="i-heroicons-user-20-solid" class="h-5 w-5" />
    </span>

    <span class="hidden min-w-0 flex-col leading-tight sm:flex">
      <span
        class="text-[10px] font-semibold uppercase tracking-[0.14em]"
        :class="isLight ? 'text-slate-600' : 'text-slate-400'"
      >
        Juan Miguel
      </span>
      <span
        class="truncate text-sm font-extrabold uppercase tracking-[0.08em]"
        :class="isLight ? 'text-slate-800' : 'text-slate-100'"
      >
        Ruiz Supelano
      </span>
    </span>
  </UButton>
</template>

<style scoped>
.nav-brand {
  font-family: 'Segoe UI', 'Inter', 'Roboto', system-ui, sans-serif;
}
</style>
