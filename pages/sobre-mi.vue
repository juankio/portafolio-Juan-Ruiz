<script setup>
import AboutSection from '~/components/AboutSection.vue'
import AboutHero from '~/components/sobre-mi/AboutHero.vue'
import EducationSection from '~/components/sobre-mi/EducationSection.vue'

definePageMeta({ ssr: false })

const { isLight } = useThemeMode()
const { t } = useI18n()

const chips = computed(() => {
  const value = t('about.chips', {}, { returnObjects: true })
  return Array.isArray(value) ? value : ['Frontend', 'UX/UI', 'PWAs', 'Animacion']
})

const education = [
  {
    title: 'Ingenieria de Sistemas (en curso)',
    place: 'UCC - Universidad Cooperativa de Colombia, Colombia',
    period: '2025 - Presente',
    detail: 'Formacion enfocada en arquitectura de software, bases de datos, ingenieria backend, redes y desarrollo web moderno.'
  },
  {
    title: 'Intercambio Internacional - Ingeniero en Formacion',
    place: 'UDEM - Universidad de Monterrey, Mexico',
    period: '2023 (Segundo semestre)',
    detail: 'Intercambio academico con enfasis en proyectos, competencias profesionales, pensamiento critico e innovacion tecnologica.'
  },
  {
    title: 'Tecnologia en Desarrollo de Software',
    place: 'UNIMINUTO - Corporacion Universitaria Minuto de Dios',
    period: '2022 - 2025',
    detail: 'Enfoque en desarrollo web, bases de datos, programacion orientada a objetos, APIs, arquitectura y metodologias agiles.'
  },
  {
    title: 'Fundamentos de Programacion - Modulo 1',
    place: 'MINTIC, Gobierno de Colombia',
    period: '2021',
    detail: 'Algoritmia inicial, logica, condicionales, ciclos y estructuras basicas.'
  },
  {
    title: 'Fundamentos de Programacion - Modulo 2',
    place: 'MINTIC, Gobierno de Colombia',
    period: '2021',
    detail: 'Programacion estructurada, funciones y resolucion de problemas computacionales.'
  }
]

const courses = [
  {
    title: 'Universidad de Programacion - Python, Java y JavaScript',
    place: 'Udemy',
    period: '2023',
    detail: 'Fundamentos solidos en programacion multiparadigma, estructuras de datos y logica aplicada.'
  },
  {
    title: 'Universidad HTML - Desde Cero hasta Experto',
    place: 'Udemy',
    period: '2023',
    detail: 'Estructura web, etiquetas semanticas, accesibilidad, buenas practicas y diseno moderno.'
  },
  {
    title: 'Universidad CSS - Desde Cero hasta Experto',
    place: 'Udemy',
    period: '2023 - 2024',
    detail: 'Maquetacion avanzada, flexbox, grid, animaciones y responsive design.'
  },
  {
    title: 'De 0 a Programador: Aprende Python desde 0',
    place: 'Udemy',
    period: '2023 - 2024',
    detail: 'Sintaxis, funciones, estructuras de datos, OOP basica y automatizacion.'
  },
  {
    title: 'Vue.js 3 - Composition API + Pinia + MEVN (10 Apps)',
    place: 'Udemy',
    period: '2024',
    detail: 'Interfaces modernas, manejo de estado, APIs, composicion modular y entorno MEVN.'
  },
  {
    title: 'Dart + Introduccion a Flutter',
    place: 'Udemy',
    period: '2024',
    detail: 'Fundamentos de aplicaciones moviles multiplataforma.'
  },
  {
    title: 'Proyecto Aliado Latino - Desarrollador Full-Stack',
    place: 'Proyecto Aliado Latino',
    period: '2024',
    detail: 'Plataforma web con integracion de Google Drive API, autenticacion, manejo de archivos y dashboard empresarial.'
  },
  {
    title: 'Proyectos Personales Full-Stack',
    place: 'Side projects',
    period: '2024 - Presente',
    detail: 'Cine al Parque (PWA), Drive 2.0 (archivos y API propia), Portafolio Pro (NotchUI + Nuxt 3 + GSAP).'
  }
]
</script>



<template>
  <UPage
    :class="[
      'relative min-h-screen overflow-hidden',
      isLight ? 'bg-gray-300 text-slate-800' : 'bg-gray-900 text-slate-200'
    ]"
  >
    <div class="pointer-events-none absolute inset-0 -z-10">
      <div
        class="absolute left-0 top-0 h-96 w-96 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-red-500/20' : 'bg-red-500/15'"
      />
      <div
        class="absolute right-10 top-20 h-80 w-80 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-slate-200/60' : 'bg-gray-300/10'"
      />
      <div
        class="absolute bottom-0 left-1/3 h-80 w-80 rounded-full blur-3xl transition"
        :class="isLight ? 'bg-red-500/15' : 'bg-red-500/10'"
      />
    </div>

    <UPageBody class="!mt-0 !space-y-0 pt-16 sm:pt-20 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-10 lg:gap-12">
        <AboutHero :is-light="isLight" :chips="chips" />
        <AboutSection :is-light="isLight" />
        <EducationSection :is-light="isLight" :education="education" :courses="courses" />
      </div>
    </UPageBody>
  </UPage>
</template>
