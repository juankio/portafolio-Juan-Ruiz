<script setup>
const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/juankio', icon: 'i-ph-github-logo-fill' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-miguel-ruiz-supelano', icon: 'i-ph-linkedin-logo-fill' },
  { label: 'Email', href: 'mailto:contacto@juanmiguel.dev', icon: 'i-heroicons-envelope-20-solid' }
]
</script>

<template>
  <footer
    class="border-t transition-colors"
    :class="isLight ? 'border-slate-200 bg-white/80 backdrop-blur-sm' : 'border-slate-800 bg-slate-900/80 backdrop-blur-sm'"
  >
    <UContainer class="py-8 sm:py-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <p class="text-sm font-semibold" :class="isLight ? 'text-slate-800' : 'text-slate-200'">
            Juan Miguel Ruiz Supelano
          </p>
          <p class="text-xs" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
            &copy; {{ new Date().getFullYear() }} &middot; Nuxt &middot; Vue &middot; Tailwind &middot; PWA
          </p>
        </div>

        <div class="flex items-center gap-2">
          <UButton
            v-for="link in socialLinks"
            :key="link.label"
            :icon="link.icon"
            :to="link.href"
            :target="link.href.startsWith('mailto') ? undefined : '_blank'"
            :rel="link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'"
            variant="ghost"
            color="neutral"
            size="sm"
            class="rounded-lg"
            :aria-label="link.label"
          />
        </div>
      </div>
    </UContainer>
  </footer>
</template>
