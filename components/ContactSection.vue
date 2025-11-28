<script setup>
import GlowCard from './GlowCard.vue'

const props = defineProps({
  isLight: {
    type: Boolean,
    default: false
  }
})

const toast = useToast()

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)

const validate = () => {
  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    toast.add({ title: 'Completa todos los campos', color: 'red' })
    return false
  }
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  if (!emailRegex.test(email.value)) {
    toast.add({ title: 'Ingresa un correo valido', color: 'red' })
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (!validate()) return
  sending.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        message: message.value
      }
    })
    toast.add({ title: 'Mensaje enviado', description: 'Te respondere pronto.', color: 'green' })
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (error) {
    const reason =
      error?.data?.body ||
      error?.data?.reason ||
      error?.data?.statusMessage ||
      error?.statusMessage ||
      'Intenta mas tarde.'
    toast.add({ title: 'No se pudo enviar', description: reason, color: 'red' })
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contacto" class="py-16 sm:py-20">
    <UContainer>
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div class="space-y-4">
          <UBadge
            size="sm"
            variant="soft"
            :color="isLight ? 'neutral' : 'primary'"
            class="uppercase tracking-[0.25em] font-semibold"
          >
            Contacto
          </UBadge>
          <div class="space-y-3">
            <h2 class="text-3xl font-semibold sm:text-4xl" :class="isLight ? 'text-slate-900' : 'text-white'">
              Hablemos de tu proximo <span :class="isLight ? 'text-emerald-600' : 'text-red-500'">proyecto</span>
            </h2>
            <p class="text-lg" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
              Tienes una idea o producto que necesita vida? Escribeme y armemos algo brutalista, rapido y con intencion.
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <UBadge
              variant="soft"
              size="md"
              :color="isLight ? 'neutral' : 'primary'"
              :class="isLight ? 'text-slate-700' : 'text-slate-200'"
            >
              Disponibilidad: Remoto
            </UBadge>
            <UBadge
              variant="soft"
              size="md"
              :color="isLight ? 'neutral' : 'primary'"
              :class="isLight ? 'text-slate-700' : 'text-slate-200'"
            >
              Respuesta en 24h
            </UBadge>
          </div>
        </div>

        <GlowCard :is-light="isLight" rounded="rounded-[24px]" body-padding="p-6 sm:p-7 lg:p-8">
          <form class="space-y-5" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">Nombre</label>
              <UInput v-model="name" placeholder="Tu nombre" size="lg" variant="outline" required />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">Correo</label>
              <UInput v-model="email" type="email" placeholder="correo@ejemplo.com" size="lg" variant="outline" required />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">Mensaje</label>
              <UTextarea v-model="message" :rows="4" placeholder="Cuentame sobre tu proyecto..." variant="outline" required />
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
                Uso Resend para un delivery confiable.
              </p>
              <UButton
                type="submit"
                size="lg"
                :loading="sending"
                color="primary"
                variant="solid"
                :class="isLight ? 'bg-emerald-500  hover:bg-emerald-400' : 'bg-red-500  hover:bg-red-400 '"
              >
                Enviar mensaje
              </UButton>
            </div>
          </form>
        </GlowCard>
      </div>
    </UContainer>
  </section>
</template>
