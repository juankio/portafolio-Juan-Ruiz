<script setup>
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
</script>

<template>
  <div 
    class="absolute inset-0 pointer-events-none z-[1] overflow-hidden transition-opacity duration-300"
    :class="isLight ? 'opacity-[0.25]' : 'opacity-[0.08]'"
  >
    <svg 
      class="absolute w-full h-full" 
      :class="isLight ? 'text-slate-800' : 'text-white'" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="doodle-pattern" x="0" y="0" width="750" height="750" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)">
          <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="scale(2.5)">
            
            <!-- LOGOS -->
            <!-- Vue -->
            <g transform="translate(30, 40) scale(0.9)">
              <path d="M2 2L12 18L22 2H17L12 10L7 2H2Z" />
              <path d="M5 2L12 13L19 2" />
            </g>
            
            <!-- React -->
            <g transform="translate(260, 40) scale(0.85)">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"/>
              <circle cx="12" cy="12" r="2.5"/>
            </g>

            <!-- Angular -->
            <g transform="translate(30, 180) scale(0.9)">
              <path d="M12 2l10 4-2 12-8 4-8-4-2-12z"/>
              <path d="M12 4l-6 11h2l1-2h6l1 2h2z"/>
              <path d="M10 11h4"/>
            </g>
            
            <!-- Database (SQL/Postgres) -->
            <g transform="translate(200, 170) scale(0.9)">
              <ellipse cx="12" cy="6" rx="8" ry="3"/>
              <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3v-12"/>
              <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>
            </g>

            <!-- Nuxt -->
            <g transform="translate(40, 250) scale(0.9)">
              <path d="M12 3l-10 16h20z"/>
              <path d="M16 8l-6 10h12z"/>
            </g>
            
            <!-- MongoDB Leaf -->
            <g transform="translate(130, 250) scale(0.85)">
              <path d="M12 2C12 2 4 8 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 8 12 2 12 2Z"/>
              <path d="M12 2V22"/>
            </g>

            <!-- Rocket -->
            <g transform="translate(230, 90) scale(0.85)">
              <path d="M12 2l3 3v4l4 4v4l-4-2-3 3h-2l-3-3-4 2v-4l4-4V5l3-3z"/>
              <circle cx="12" cy="10" r="2"/>
            </g>

            <!-- Code </> -->
            <g transform="translate(270, 220) scale(0.9)">
              <path d="M8 6L2 12L8 18M16 6L22 12L16 18M14 4L10 20"/>
            </g>

            <!-- Alien -->
            <g transform="translate(110, 30) scale(0.9)">
              <path d="M12 2c5 0 9 4 9 10 0 5-4 10-9 10s-9-5-9-10c0-6 4-10 9-10z M9 11.5 a1.5 1.5 0 1 0 0-3 a1.5 1.5 0 0 0 0 3z M15 11.5 a1.5 1.5 0 1 0 0-3 a1.5 1.5 0 0 0 0 3z" />
            </g>

            <!-- T-Rex Pixelado Outline -->
            <g transform="translate(140, 90) scale(1.1)">
              <path d="M13 3h7v2h2v4h-2v2h-4v2h-2v4h-2v-4h-2v-2H8v2H6v2H4v-6h2v-2h2V9h2V7h3V3z" />
              <!-- Eye -->
              <rect x="17" y="5" width="2" height="2" />
            </g>

            <!-- Brontosaurus Outline -->
            <g transform="translate(210, 240) scale(1.2)">
              <path d="M4 18v-6A6 6 0 0110 6h4V4h4v6h-4v2h-4v6H4z" />
              <!-- Eye -->
              <rect x="14" y="6" width="2" height="2" />
            </g>

            <!-- Gamepad / Controller Outline -->
            <g transform="translate(190, 20) scale(0.9)">
              <rect x="2" y="6" width="20" height="12" rx="6" />
              <!-- D-Pad -->
              <path d="M6 12h4M8 10v4" />
              <!-- Buttons -->
              <circle cx="15" cy="13" r="1" />
              <circle cx="18" cy="11" r="1" />
            </g>

            <!-- Stegosaurus Outline -->
            <g transform="translate(100, 160) scale(0.9)">
              <path d="M4 16 c0 -4 4 -6 10 -6 c4 0 6 2 8 4 c2 0 4 2 4 4 c0 2 -2 2 -4 2 H6 c-2 0 -2 -2 -2 -4 z" />
              <polygon points="8,10 10,6 12,10" />
              <polygon points="12,10 15,5 18,10" />
              <polygon points="17,11 19,8 21,11" />
              <rect x="7" y="19" width="2" height="5" />
              <rect x="11" y="19" width="2" height="4" />
              <rect x="17" y="19" width="2" height="5" />
              <rect x="21" y="19" width="2" height="4" />
            </g>

            <!-- Taza de Café Outline -->
            <g transform="translate(40, 110) scale(1)">
              <path d="M6 10 h12 v4 c0 3.3 -2.7 6 -6 6 s-6 -2.7 -6 -6 v-4 z" />
              <path d="M18 11 h2 c1.6 0 3 1.3 3 3 s-1.3 3 -3 3 h-2 v-2 h2 c0.5 0 1 -0.4 1 -1 s-0.4 -1 -1 -1 h-2 z" />
              <path d="M8 8 c 0 -2 -2 -2 -2 -4 h2 c0 2 2 2 2 4 z" />
              <path d="M12 8 c 0 -2 -2 -2 -2 -4 h2 c0 2 2 2 2 4 z" />
              <path d="M16 8 c 0 -2 -2 -2 -2 -4 h2 c0 2 2 2 2 4 z" />
            </g>

            <!-- Estrellas y chispas de relleno para simular graffiti/doodles -->
            <path d="M70 100 l 4 4 m 0 -4 l -4 4" />
            <circle cx="140" cy="150" r="1.5" />
            <circle cx="280" cy="90" r="1" />
            <path d="M20 150 l 5 5 m 0 -5 l -5 5" />
            <path d="M220 40 l 3 3 m 0 -3 l -3 3" />
            <circle cx="90" cy="220" r="2" />
            <path d="M280 280 l 4 4 m 0 -4 l -4 4" />
            <circle cx="40" cy="80" r="1" />
            <circle cx="250" cy="180" r="1.5" />
            <path d="M150 20 l 3 3 m 0 -3 l -3 3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#doodle-pattern)" />
    </svg>
  </div>
</template>