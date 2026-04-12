<script setup lang="ts">
const props = defineProps<{
  isLight: boolean
}>()

const toast = useToast()
const { t } = useI18n()

const name = ref('')
const email = ref('')
const message = ref('')
const sending = ref(false)
const sent = ref(false)

const errors = reactive<{ name: string; email: string; message: string }>({
  name: '',
  email: '',
  message: ''
})

const maxMessage = 1000

const clearErrors = () => {
  errors.name = ''
  errors.email = ''
  errors.message = ''
}

const validate = () => {
  clearErrors()
  let valid = true

  if (!name.value.trim()) {
    errors.name = t('contact.validation.required')
    valid = false
  }
  if (!email.value.trim()) {
    errors.email = t('contact.validation.required')
    valid = false
  } else {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (!emailRegex.test(email.value)) {
      errors.email = t('contact.validation.email')
      valid = false
    }
  }
  if (!message.value.trim()) {
    errors.message = t('contact.validation.required')
    valid = false
  }

  return valid
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
    sent.value = true
    name.value = ''
    email.value = ''
    message.value = ''
  } catch (error) {
    const reason =
      error?.data?.body ||
      error?.data?.reason ||
      error?.data?.statusMessage ||
      error?.statusMessage ||
      t('contact.validation.fallback')
    toast.add({ title: t('contact.validation.error'), description: reason, color: 'red' })
  } finally {
    sending.value = false
  }
}

const resetForm = () => {
  sent.value = false
  clearErrors()
}
</script>

<template>
  <div
    class="p-6 sm:p-7 lg:p-8 border-2 bg-[var(--color-surface-card)]"
    :class="isLight ? 'border-[var(--color-border-accent)]' : 'border-[var(--color-border-accent)]'"
    style="border-radius: 4px 12px 6px 10px; backdrop-filter: blur(12px)"
  >
    <Transition name="fade" mode="out-in">
      <div v-if="sent" key="success" class="flex flex-col items-center justify-center gap-4 py-8 text-center">
        <div
          class="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-soft)]"
        >
          <UIcon
            name="i-heroicons-check-20-solid"
            class="h-7 w-7 text-[var(--color-accent)]"
          />
        </div>
        <h3 class="text-xl font-bold" :class="isLight ? 'text-slate-700' : 'text-white'">
          {{ t('contact.validation.success') }}
        </h3>
        <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
          {{ t('contact.validation.successDesc') }}
        </p>
        <UButton
          variant="outline"
          size="md"
          :class="isLight ? 'border-slate-300 text-slate-600' : 'border-slate-600 text-slate-300'"
          @click="resetForm"
        >
          {{ t('contact.form.sendAnother') }}
        </UButton>
      </div>

      <form v-else key="form" class="space-y-5" @submit.prevent="handleSubmit">
        <div class="space-y-1.5">
          <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
            {{ t('contact.form.nameLabel') }}
          </label>
          <UInput
            v-model="name"
            :placeholder="t('contact.form.namePlaceholder')"
            size="lg"
            variant="outline"
            required
            @input="errors.name = ''"
          />
          <p v-if="errors.name" class="text-xs text-red-500">{{ errors.name }}</p>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
            {{ t('contact.form.emailLabel') }}
          </label>
          <UInput
            v-model="email"
            type="email"
            :placeholder="t('contact.form.emailPlaceholder')"
            size="lg"
            variant="outline"
            required
            @input="errors.email = ''"
          />
          <p v-if="errors.email" class="text-xs text-red-500">{{ errors.email }}</p>
        </div>

        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium" :class="isLight ? 'text-slate-700' : 'text-slate-200'">
              {{ t('contact.form.messageLabel') }}
            </label>
            <span class="text-xs" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
              {{ message.length }}/{{ maxMessage }}
            </span>
          </div>
          <UTextarea
            v-model="message"
            :rows="4"
            :maxlength="maxMessage"
            :placeholder="t('contact.form.messagePlaceholder')"
            variant="outline"
            required
            @input="errors.message = ''"
          />
          <p v-if="errors.message" class="text-xs text-red-500">{{ errors.message }}</p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p class="text-sm" :class="isLight ? 'text-slate-400' : 'text-slate-500'">
            {{ t('contact.form.helper') }}
          </p>
          <UButton
            type="submit"
            size="lg"
            :loading="sending"
            class="border-sketchy !rounded-none bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-dark)]"
          >
            {{ t('contact.form.submit') }}
          </UButton>
        </div>
      </form>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
