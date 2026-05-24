<template>
  <div class="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-[0.14] dark:opacity-[0.08] transition-opacity duration-300">
    <svg class="absolute w-full h-full text-slate-900 dark:text-white" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="doodle-pattern" x="0" y="0" width="750" height="750" patternUnits="userSpaceOnUse" patternTransform="rotate(-4)">
          <g stroke="currentColor" stroke-width="1.2" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="scale(2.5)">
            
            <!-- Vue -->
            <g transform="translate(30, 40) scale(0.9)">
              <path d="M2 2L12 18L22 2H17L12 10L7 2H2Z" />
              <path d="M5 2L12 13L19 2" />
            </g>
            
            <!-- React -->
            <g transform="translate(180, 50) scale(0.85)">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)"/>
              <circle cx="12" cy="12" r="2.5"/>
            </g>
            
            <!-- Angular -->
            <g transform="translate(100, 150) scale(0.9)">
              <path d="M12 2l10 4-2 12-8 4-8-4-2-12z"/>
              <path d="M12 4l-6 11h2l1-2h6l1 2h2z"/>
              <path d="M10 11h4"/>
            </g>
            
            <!-- Database (SQL/Postgres) -->
            <g transform="translate(240, 160) scale(0.9)">
              <ellipse cx="12" cy="6" rx="8" ry="3"/>
              <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3v-12"/>
              <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>
            </g>
            
            <!-- Nuxt -->
            <g transform="translate(30, 240) scale(0.9)">
              <path d="M12 3l-10 16h20z"/>
              <path d="M16 8l-6 10h12z"/>
            </g>
            
            <!-- MongoDB Leaf -->
            <g transform="translate(140, 260) scale(0.85)">
              <path d="M12 2C12 2 4 8 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 8 12 2 12 2Z"/>
              <path d="M12 2V22"/>
            </g>

            <!-- T-Rex (Pixel Outline Style) -->
            <g transform="translate(170, 220) scale(1.1)">
              <path d="M13 3h7v2h2v4h-2v2h-4v2h-2v4h-2v-4h-2v-2H8v2H6v2H4v-6h2v-2h2V9h2V7h3V3z"/>
              <rect x="17" y="5" width="2" height="2" fill="currentColor" stroke="none"/>
            </g>
            
            <!-- Alien -->
            <g transform="translate(110, 30) scale(0.9)">
              <path d="M12 2c5 0 9 4 9 10 0 5-4 10-9 10s-9-5-9-10c0-6 4-10 9-10z"/>
              <circle cx="9" cy="10" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="15" cy="10" r="1.5" fill="currentColor" stroke="none"/>
            </g>
            
            <!-- Brontosaurus -->
            <g transform="translate(250, 250) scale(1)">
              <path d="M4 18v-6A6 6 0 0110 6h4V4h4v6h-4v2h-4v6H4z"/>
              <rect x="14" y="6" width="2" height="2" fill="currentColor" stroke="none"/>
            </g>

            <!-- Rocket -->
            <g transform="translate(230, 80) scale(0.85)">
              <path d="M12 2l3 3v4l4 4v4l-4-2-3 3h-2l-3-3-4 2v-4l4-4V5l3-3z"/>
              <circle cx="12" cy="10" r="2"/>
            </g>
            
            <!-- Estrellas y chispas de relleno para simular graffiti/doodles -->
            <path d="M70 100 l 4 4 m 0 -4 l -4 4" />
            <circle cx="140" cy="110" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="280" cy="130" r="1" fill="currentColor" stroke="none" />
            <path d="M20 120 l 5 5 m 0 -5 l -5 5" />
            <path d="M220 20 l 3 3 m 0 -3 l -3 3" />
            <circle cx="90" cy="220" r="2" fill="currentColor" stroke="none" />
            <path d="M280 210 l 4 4 m 0 -4 l -4 4" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#doodle-pattern)" />
    </svg>
  </div>
</template>