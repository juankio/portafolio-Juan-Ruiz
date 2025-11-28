<script setup>
const links = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mi', href: '#sobre-mi' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' }
]

const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 10
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300"
    :class="scrolled ? 'bg-black/70 border-b border-white/5' : 'bg-transparent'"
  >
    <div class="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <a href="#inicio" class="flex items-center gap-3 font-semibold tracking-tight">
        <span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-red-500 text-lg text-black shadow-lg shadow-red-500/40">
          JM
        </span>
        <div class="leading-tight">
          <p class="text-sm text-slate-400">Juan Miguel</p>
          <p class="text-base font-semibold text-slate-100">Ruiz Supelano</p>
        </div>
      </a>

      <nav class="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
        <a
          v-for="item in links"
          :key="item.href"
          :href="item.href"
          class="group relative transition hover:text-white"
        >
          {{ item.label }}
          <span class="absolute -bottom-1 left-0 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <UButton
          to="#proyectos"
          color="primary"
          size="md"
          class="bg-red-500 text-black hover:bg-red-400"
        >
          Ver proyectos
        </UButton>
      </div>

      <nav class="flex flex-wrap gap-4 text-sm font-medium text-slate-300 md:hidden">
        <a
          v-for="item in links"
          :key="item.href"
          :href="item.href"
          class="rounded-full border border-white/10 px-3 py-1.5 transition hover:border-white/40 hover:text-white"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
