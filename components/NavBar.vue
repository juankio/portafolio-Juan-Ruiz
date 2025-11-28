<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-mode'])

const links = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mi', href: '/sobre-mi' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Contacto', href: '/contacto' }
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
    :class="
      scrolled
        ? isLight
          ? 'bg-white/92 border-b border-slate-200'
          : 'bg-black/80 border-b border-white/5'
        : isLight
          ? 'bg-white/88'
          : 'bg-gradient-to-r from-black/85 via-black/70 to-black/80'
    "
  >
    <UContainer class="flex items-center gap-3 py-1 md:py-1.5">
      <UButton
        to="/"
        color="white"
        variant="ghost"
        class="flex shrink-0 items-center gap-2.5 px-0 text-base font-semibold tracking-tight hover:bg-transparent"
      >
        <UBadge
          color="white"
          variant="solid"
          :class="
            [
              'flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold uppercase tracking-tight !text-white ring-2 leading-none shadow-lg',
              isLight
                ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-black shadow-[0_12px_30px_rgba(0,0,0,0.45)] ring-slate-700/70'
                : 'bg-gradient-to-br from-rose-500 via-red-500 to-amber-200 shadow-[0_14px_32px_rgba(248,113,113,0.45)] ring-red-300/70'
            ]
          "
        >
          JM
        </UBadge>
        <div class="leading-tight text-left">
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Juan Miguel</p>
          <p class="text-base font-semibold" :class="isLight ? 'text-slate-900' : 'text-slate-100'">Ruiz Supelano</p>
        </div>
      </UButton>

      <nav class="hidden flex-1 items-center justify-center gap-1 md:flex">
        <UButton
          v-for="item in links"
          :key="item.href"
          :to="item.href"
          variant="ghost"
          color="gray"
          size="sm"
          class="font-medium px-3 py-1"
          :class="isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'"
        >
          {{ item.label }}
        </UButton>
      </nav>

      <div class="flex flex-1 items-center justify-end gap-2.5">
        <UButton
          to="/proyectos"
          color="red"
          size="sm"
          variant="soft"
        >
          Ver proyectos
        </UButton>
        <UButton
          size="sm"
          variant="outline"
          :icon="isLight ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
          :class="isLight ? 'border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50' : 'border-white/20 text-white hover:border-white/40 hover:bg-white/10'"
          class="rounded-full"
          aria-label="Cambiar modo"
          @click="emit('toggle-mode')"
        />
      </div>

      <nav class="flex flex-wrap gap-2 md:hidden">
        <UBadge
          v-for="item in links"
          :key="item.href"
          :to="item.href"
          color="gray"
          variant="outline"
          :class="isLight ? 'border-slate-200 text-slate-700 hover:border-slate-300' : 'border-white/15 text-slate-200 hover:border-white/40'"
        >
          {{ item.label }}
        </UBadge>
      </nav>
    </UContainer>
  </header>
</template>
