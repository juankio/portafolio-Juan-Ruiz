<script setup>
import NavActions from '~/components/nav/NavActions.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})

const emit = defineEmits(['toggle-mode'])

const { t } = useI18n()

const links = computed(() => [
  { label: t('nav.links.home'), href: '/' },
  { label: t('nav.links.about'), href: '/sobre-mi' },
  { label: t('nav.links.projects'), href: '/proyectos' },
  { label: t('nav.links.contact'), href: '/contacto' }
])

const slideoverUi = computed(() => (
  props.isLight
    ? {
        overlay: 'bg-slate-900/45',
        content: 'bg-gray-300 text-slate-900'
      }
    : {
        overlay: 'bg-slate-900/75',
        content: 'bg-[#0f1621] text-slate-100'
      }
))

</script>

<template>
  <USlideover :close="false" :ui="slideoverUi">
    <template #default>
      <slot name="trigger" />
    </template>

    <template #body="{ close }">
      <div class="flex h-full flex-col gap-6 px-5 py-6">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold uppercase tracking-[0.3em]">Menu</span>
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            size="sm"
            class="rounded-full"
            :class="isLight ? 'text-slate-700 hover:bg-emerald-100' : 'text-slate-100 hover:bg-red-500/15'"
            aria-label="Close menu"
            @click="close"
          />
        </div>

        <div class="flex flex-col gap-2">
          <UButton
            v-for="item in links"
            :key="item.href"
            :to="item.href"
            variant="ghost"
            size="lg"
            class="mobile-nav w-full justify-start"
            :class="isLight
              ? 'text-slate-700 hover:bg-emerald-50 hover:border-emerald-300'
              : 'text-slate-100 hover:bg-red-500/10 hover:border-red-400/60'"
            @click="close"
          >
            {{ item.label }}
          </UButton>
        </div>

        <div class="h-px" :class="isLight ? 'bg-emerald-300/60' : 'bg-red-500/40'" />

        <NavActions :is-light="isLight" stacked @toggle-mode="emit('toggle-mode')" />
      </div>
    </template>
  </USlideover>
</template>

<style scoped>
.mobile-nav {
  letter-spacing: 0.06em;
  border: 1px solid transparent;
  text-transform: uppercase;
  font-size: 0.95rem;
  font-weight: 700;
  font-family: "Bangers", "Druk Text Wide Trial", "Druk Wide Trial", Inter, system-ui, sans-serif;
}
</style>
