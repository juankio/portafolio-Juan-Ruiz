<script setup>
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
  <section
    id="contacto"
    class="mx-auto max-w-6xl px-6 py-16 sm:py-20"
  >
    <div class="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.25em]" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Contacto</p>
        <h2 class="text-3xl font-semibold sm:text-4xl" :class="isLight ? 'text-slate-900' : 'text-white'">
          Hablemos de tu proximo <span class="text-red-500">proyecto</span>
        </h2>
        <p class="text-lg" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
          Tienes una idea o producto que necesita vida? Escribeme y armemos algo brutalista, rapido y con intencion.
        </p>
        <div class="flex flex-wrap gap-3 text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          <span
            class="rounded-full border px-3 py-1"
            :class="isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5'"
          >
            Disponibilidad: Remoto
          </span>
          <span
            class="rounded-full border px-3 py-1"
            :class="isLight ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5'"
          >
            Respuesta en 24h
          </span>
        </div>
      </div>

      <div
        class="rounded-[28px] p-6 shadow-xl shadow-red-500/15 transition-colors"
        :class="isLight ? 'border border-slate-200 bg-white' : 'border border-white/10 bg-white/5'"
      >
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div class="space-y-2">
            <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">Nombre</label>
            <UInput
              v-model="name"
              placeholder="Tu nombre"
              size="lg"
              :class="isLight ? 'bg-white' : 'bg-black/30'"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">Correo</label>
            <UInput
              v-model="email"
              type="email"
              placeholder="correo@ejemplo.com"
              size="lg"
              :class="isLight ? 'bg-white' : 'bg-black/30'"
              required
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">Mensaje</label>
            <UTextarea
              v-model="message"
              :rows="4"
              placeholder="Cuentame sobre tu proyecto..."
              :class="isLight ? 'bg-white' : 'bg-black/30'"
              required
            />
          </div>

          <div class="flex items-center justify-between gap-3">
            <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">Uso Resend para un delivery confiable.</p>
            <UButton
              type="submit"
              size="lg"
              :loading="sending"
              class="bg-red-500 text-black hover:bg-red-400"
            >
              Enviar mensaje
            </UButton>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
