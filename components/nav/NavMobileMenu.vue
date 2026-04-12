<script setup>
import NavActions from './NavActions.vue'

const props = defineProps({
  isLight: { type: Boolean, default: false }
})
const isLight = computed(() => props.isLight)

const emit = defineEmits(['toggle-mode'])

const { t } = useI18n()
const route = useRoute()

const links = computed(() => [
  { label: t('nav.links.home'), href: '/' },
  { label: t('nav.links.about'), href: '/sobre-mi' },
  { label: t('nav.links.projects'), href: '/proyectos' },
  { label: t('nav.links.contact'), href: '/contacto' }
])

const isActive = (href) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

const slideoverUi = computed(() => (
  isLight.value
    ? {
        overlay: 'bg-black/20',
        content: 'bg-[var(--color-wall)] text-slate-900'
      }
    : {
        overlay: 'bg-black/50',
        content: 'bg-[var(--color-wall)] text-slate-100'
      }
))

const socialLinks = [
  { icon: 'i-ph-github-logo-fill', href: 'https://github.com/juankio', label: 'GitHub' },
  { icon: 'i-ph-linkedin-logo-fill', href: 'https://linkedin.com/in/juankio', label: 'LinkedIn' }
]
</script>

<template>
  <USlideover :close="false" :ui="slideoverUi">
    <template #default>
      <slot name="trigger" />
    </template>

    <template #body="{ close }">
      <div class="flex h-full flex-col gap-6 px-5 py-6">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-[0.12em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
            Menu
          </span>
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            color="neutral"
            size="sm"
            class="rounded-lg"
            aria-label="Close menu"
            @click="close"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <UButton
            v-for="item in links"
            :key="item.href"
            :to="item.href"
            variant="ghost"
            color="neutral"
            size="lg"
            class="w-full justify-start rounded-lg text-sm font-bold uppercase tracking-[0.04em]"
            :class="[
              isActive(item.href)
                ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent)]'
                : ''
            ]"
            @click="close"
          >
            {{ item.label }}
          </UButton>
        </div>

        <div class="h-px" :class="isLight ? 'bg-slate-200' : 'bg-slate-800'" />

        <NavActions :is-light="isLight" stacked @toggle-mode="emit('toggle-mode')" />

        <div class="mt-auto flex items-center gap-2">
          <UButton
            v-for="social in socialLinks"
            :key="social.label"
            :icon="social.icon"
            :to="social.href"
            target="_blank"
            variant="ghost"
            color="neutral"
            size="sm"
            class="rounded-lg"
            :aria-label="social.label"
          />
        </div>
      </div>
    </template>
  </USlideover>
</template>
