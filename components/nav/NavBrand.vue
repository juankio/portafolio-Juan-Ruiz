<script setup>
const props = defineProps({
  isLight: { type: Boolean, default: false }
})
</script>

<template>
  <UButton
    to="/"
    color="neutral"
    variant="ghost"
    class="nav-brand group flex shrink-0 items-center gap-3 px-0 text-base font-semibold tracking-tight hover:bg-transparent"
  >
    <UBadge
      color="neutral"
      variant="solid"
      :class="[
        'flex h-11 w-11 items-center justify-center rounded-2xl ring-2 leading-none shadow-lg',
        isLight
          ? 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-300 shadow-[0_12px_28px_rgba(16,185,129,0.45)] ring-emerald-300/70'
          : 'bg-gradient-to-br from-rose-500 via-red-500 to-amber-200 shadow-[0_14px_32px_rgba(248,113,113,0.45)] ring-red-300/70'
      ]"
    >
      <div class="relative h-5 w-5">
        <UIcon
          name="i-heroicons-user-20-solid"
          class="absolute inset-0 h-5 w-5 transition-opacity duration-200"
          :class="isLight ? 'text-slate-800 group-hover:opacity-0' : 'text-slate-200 group-hover:opacity-0'"
        />
        <UIcon
          name="i-ph-game-controller-bold"
          class="absolute inset-0 h-5 w-5 opacity-0 transition-opacity duration-200"
          :class="isLight ? 'text-slate-800 group-hover:opacity-100' : 'text-slate-200 group-hover:opacity-100'"
        />
      </div>
    </UBadge>
    <div class="leading-tight text-left flex items-start gap-2 relative">
      <div class="mt-[2px] text-sm transition duration-300"
        :class="isLight ? 'text-emerald-500' : 'text-red-400'">
        <UIcon
          name="i-heroicons-arrows-up-down-20-solid"
          class="h-4 w-4 transition duration-300 transform group-hover:rotate-180 group-hover:-translate-y-[1px]"
        />
      </div>
      <div class="relative h-4">
        <p
          class="text-xs uppercase tracking-[0.18em] transition duration-200"
          :class="isLight ? 'text-slate-700 group-hover:opacity-0' : 'text-slate-300 group-hover:opacity-0'"
        >
          Juan Miguel
        </p>
        <p
          class="text-xs uppercase tracking-[0.18em] transition duration-200 absolute inset-0 opacity-0 group-hover:opacity-100"
          :class="isLight ? 'text-slate-700' : 'text-slate-300'"
        >
          Ruiz Supelano
        </p>
      </div>
      <div class="relative h-6">
        <p
          class="text-lg font-black uppercase tracking-[0.1em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition duration-200"
          :class="isLight ? 'text-slate-800 group-hover:opacity-0' : 'text-slate-200 group-hover:opacity-0'"
        >
          Ruiz Supelano
        </p>
        <p
          class="text-lg font-black uppercase tracking-[0.1em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] transition duration-200 absolute inset-0 opacity-0 group-hover:opacity-100"
          :class="isLight ? 'text-slate-800' : 'text-slate-200'"
        >
          Juan Miguel
        </p>
      </div>
    </div>
  </UButton>
</template>

<style scoped>
.nav-brand {
  font-family: "Druk Wide Trial", Inter, system-ui, sans-serif;
}
</style>
