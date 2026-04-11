<script setup lang="ts">
import ContactInfo from './ContactInfo.vue'
import ContactForm from './ContactForm.vue'

defineProps<{
  isLight: boolean
}>()
</script>

<template>
  <section id="contacto" class="py-16 sm:py-20">
    <UContainer>
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <ContactInfo :is-light="isLight" />
        <ContactForm :is-light="isLight" />
      </div>
    </UContainer>
  </section>
</template>
