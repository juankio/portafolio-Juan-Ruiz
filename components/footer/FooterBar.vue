<script setup>
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'

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
  <footer class="footer-wall relative overflow-hidden border-t-2 border-[var(--color-border-accent)]">
    <!-- Spray decorations -->
    <SpraySplatter class="absolute -top-4 -left-6" size="sm" :opacity="0.05" />
    <SpraySplatter class="absolute -bottom-4 -right-8" size="md" :opacity="0.04" color="var(--spray-cyan)" />

    <!-- Spray paint line top -->
    <div class="absolute top-0 left-0 right-0 h-[2px]" style="background: repeating-linear-gradient(90deg, var(--color-accent) 0px, var(--color-accent) 16px, transparent 16px, transparent 22px, var(--color-accent) 22px, var(--color-accent) 30px, transparent 30px, transparent 34px); opacity: 0.4" aria-hidden="true" />

    <UContainer class="relative z-10 py-8 sm:py-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <p class="text-sm font-bold text-spray" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
            Juan Miguel Ruiz Supelano
          </p>
          <p class="text-xs font-marker" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
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
            class="rounded-lg transition-all hover:text-[var(--color-accent)] hover:scale-110"
            :aria-label="link.label"
          />
        </div>
      </div>
    </UContainer>

    <!-- Bottom graffiti mark -->
    <div class="absolute bottom-1 right-4 font-marker text-[0.45rem] tracking-widest opacity-10 text-[var(--color-accent)]" aria-hidden="true">
      BUILT WITH ★ PASSION
    </div>
  </footer>
</template>

<style scoped>
.footer-wall {
  background: var(--color-surface-card);
  backdrop-filter: blur(12px);
}
</style>
