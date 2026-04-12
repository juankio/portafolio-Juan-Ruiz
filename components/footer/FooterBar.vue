<script setup>
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'

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
  <footer class="footer-wall relative overflow-hidden">
    <!-- Spray paint top line -->
    <div class="footer-spray-line absolute top-0 left-0 right-0 h-[2px]" aria-hidden="true" />

    <!-- Spray decorations -->
    <SpraySplatter class="absolute -top-4 -left-6 pointer-events-none" size="sm" :opacity="0.06" />
    <SpraySplatter class="absolute -bottom-4 -right-8 pointer-events-none" size="md" :opacity="0.04" color="var(--spray-cyan)" />
    <PaintDrip class="absolute top-0 left-20 pointer-events-none" :count="1" :animated="true" />

    <!-- Crown SVG decoration -->
    <svg class="absolute top-3 right-8 w-10 h-7 opacity-[0.08] text-[var(--color-accent)]" viewBox="0 0 100 70" fill="currentColor" aria-hidden="true">
      <path d="M10 60 L10 25 L30 40 L50 10 L70 40 L90 25 L90 60 Z" />
      <circle cx="10" cy="20" r="4" /><circle cx="50" cy="5" r="4" /><circle cx="90" cy="20" r="4" />
    </svg>

    <UContainer class="relative z-10 py-8 sm:py-10">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <!-- Signature -->
        <div class="space-y-1.5">
          <p class="text-sm font-bold text-spray" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
            Juan Miguel Ruiz Supelano
          </p>
          <p class="text-xs font-marker" :class="isLight ? 'text-slate-400' : 'text-slate-500'" style="letter-spacing: 0.06em">
            &copy; {{ new Date().getFullYear() }} &middot; Nuxt &middot; Vue &middot; Tailwind &middot; PWA
          </p>
        </div>

        <!-- Social links as graffiti buttons -->
        <div class="flex items-center gap-2">
          <a
            v-for="link in socialLinks"
            :key="link.label"
            :href="link.href"
            :target="link.href.startsWith('mailto') ? undefined : '_blank'"
            :rel="link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'"
            class="footer-social flex items-center justify-center w-10 h-10"
            :aria-label="link.label"
          >
            <UIcon :name="link.icon" class="h-5 w-5" />
          </a>
        </div>
      </div>
    </UContainer>

    <!-- Bottom graffiti mark -->
    <div class="absolute bottom-1.5 right-4 font-marker text-[0.5rem] tracking-widest opacity-10 text-[var(--color-accent)]" aria-hidden="true">
      BUILT WITH ★ PASSION
    </div>
  </footer>
</template>

<style scoped>
.footer-wall {
  background: var(--color-surface-card);
  backdrop-filter: blur(12px);
  border-top: 2px solid var(--color-border-accent);
}

.footer-spray-line {
  background: repeating-linear-gradient(
    90deg,
    var(--color-accent) 0px,
    var(--color-accent) 12px,
    transparent 12px,
    transparent 18px,
    var(--color-accent) 18px,
    var(--color-accent) 24px,
    transparent 24px,
    transparent 30px
  );
  opacity: 0.35;
}

.footer-social {
  color: var(--color-text-secondary);
  border: 2px solid var(--color-border-accent);
  border-radius: 3px 8px 4px 6px;
  transition: all 0.2s var(--ease-spring);
}

.footer-social:hover {
  color: var(--color-accent);
  border-color: var(--color-accent);
  box-shadow: 0 0 10px var(--color-accent-soft);
  transform: translateY(-2px) rotate(-2deg);
}
</style>
