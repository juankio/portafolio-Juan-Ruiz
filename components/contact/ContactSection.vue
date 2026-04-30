<script setup lang="ts">
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
import ContactInfo from './ContactInfo.vue'
import ContactForm from './ContactForm.vue'



useScrollAnimation('.contact-animate-trigger', {
  animation: {
    translateY: [50, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200
  },
  stagger: 200
})

useTextSplit('.split-text-contact', { stagger: 15, duration: 700 })
</script>

<template>
  <section id="contacto" class="py-16 sm:py-20 contact-animate-trigger animate-group">
    <UContainer>
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div class="animate-item opacity-0">
          <ContactInfo :is-light="isLight" />
        </div>
        <div class="animate-item opacity-0">
          <ContactForm :is-light="isLight" />
        </div>
      </div>
    </UContainer>
  </section>
</template>
