<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-mode'])

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
    :class="
      scrolled
        ? isLight
          ? 'bg-white/90 border-b border-slate-200'
          : 'bg-black/70 border-b border-white/5'
        : 'bg-transparent'
    "
  >
    <UContainer class="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between">
      <UButton
        to="#inicio"
        color="white"
        variant="ghost"
        class="flex items-center gap-3 px-0 text-base font-semibold tracking-tight hover:bg-transparent"
      >
        <UBadge
          color="red"
          variant="solid"
          class="flex h-10 w-10 items-center justify-center rounded-2xl text-lg text-black shadow-lg shadow-red-500/40"
        >
          JM
        </UBadge>
        <div class="leading-tight text-left">
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Juan Miguel</p>
          <p class="text-base font-semibold" :class="isLight ? 'text-slate-900' : 'text-slate-100'">Ruiz Supelano</p>
        </div>
      </UButton>

      <nav class="hidden items-center gap-2 md:flex">
        <UButton
          v-for="item in links"
          :key="item.href"
          :to="item.href"
          variant="ghost"
          color="gray"
          size="sm"
          class="font-medium"
          :class="isLight ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-200 hover:bg-white/10'"
        >
          {{ item.label }}
        </UButton>
      </nav>

      <div class="flex items-center gap-2">
        <UButton
          size="sm"
          variant="outline"
          :class="isLight ? 'border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50' : 'border-white/20 text-white hover:border-white/40 hover:bg-white/10'"
          @click="emit('toggle-mode')"
        >
          {{ isLight ? 'Modo oscuro' : 'Modo claro' }}
        </UButton>
        <UButton
          to="#proyectos"
          color="red"
          size="sm"
          variant="solid"
          class="text-black"
        >
          Ver proyectos
        </UButton>
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
