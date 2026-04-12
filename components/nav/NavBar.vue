<script setup>
import NavBrand from './NavBrand.vue'
import NavLinks from './NavLinks.vue'
import NavActions from './NavActions.vue'
import NavMobileMenu from './NavMobileMenu.vue'

defineProps({
  isLight: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-mode'])
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 8
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
    class="sticky top-0 z-50 border-b transition-all duration-200"
    :class="[
      isLight
        ? scrolled
          ? 'bg-[var(--color-wall)]/90 backdrop-blur-md border-[var(--color-border)] shadow-sm'
          : 'bg-[var(--color-wall)]/70 backdrop-blur-sm border-[var(--color-border-subtle)]'
        : scrolled
          ? 'bg-[var(--color-wall)]/90 backdrop-blur-md border-[var(--color-border)] shadow-sm shadow-black/10'
          : 'bg-[var(--color-wall)]/70 backdrop-blur-sm border-[var(--color-border-subtle)]'
    ]"
  >
    <div class="flex h-20 items-center gap-4 px-6 sm:px-10 lg:px-16 xl:px-20 2xl:px-24">
      <NavBrand :is-light="isLight" />
      <NavLinks :is-light="isLight" />
      <NavActions class="hidden lg:flex" :is-light="isLight" @toggle-mode="emit('toggle-mode')" />

      <div class="ml-auto flex lg:hidden">
        <NavMobileMenu :is-light="isLight" @toggle-mode="emit('toggle-mode')">
          <template #trigger>
            <UButton
              icon="i-heroicons-bars-3-bottom-right-20-solid"
              size="md"
              variant="ghost"
              color="neutral"
              class="rounded-xl"
              aria-label="Open menu"
            />
          </template>
        </NavMobileMenu>
      </div>
    </div>
  </header>
</template>
