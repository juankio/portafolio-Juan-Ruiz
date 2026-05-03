<script setup lang="ts">
import { inject, ref, reactive } from 'vue'
import ContactField from './ContactField.vue'
import ContactSuccess from './ContactSuccess.vue'

const isLight = inject('isLight', ref(false))

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
  } else if (name.value.trim().length < 2) {
    errors.name = 'El nombre es muy corto'
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
  } else if (message.value.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres'
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
    toast.add({ title: t('contact.validation.success'), description: t('contact.validation.successDesc'), color: 'emerald' })
  } catch (error: any) {
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
  <div class="contact-form relative overflow-hidden ">
    <div class="relative z-10 p-6 sm:p-7 lg:p-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-6">
        <span class="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] bg-[var(--color-accent-soft)] px-3 py-1 rounded-full">
          {{ t('contact.form.messageLabel') }}
        </span>
      </div>

      <Transition name="fade" mode="out-in">
        <!-- Success state -->
        <ContactSuccess v-if="sent" key="success" @reset="resetForm" />

        <!-- Form -->
        <form v-else key="form" class="space-y-5" @submit.prevent="handleSubmit">
          <ContactField
            id="contact-name"
            v-model="name"
            number="01"
            :label="t('contact.form.nameLabel')"
            :placeholder="t('contact.form.namePlaceholder')"
            :error="errors.name"
            required
            @clear-error="errors.name = ''"
          />

          <ContactField
            id="contact-email"
            v-model="email"
            type="email"
            number="02"
            :label="t('contact.form.emailLabel')"
            :placeholder="t('contact.form.emailPlaceholder')"
            :error="errors.email"
            required
            @clear-error="errors.email = ''"
          />

          <ContactField
            id="contact-message"
            v-model="message"
            type="textarea"
            number="03"
            :label="t('contact.form.messageLabel')"
            :placeholder="t('contact.form.messagePlaceholder')"
            :maxlength="maxMessage"
            :error="errors.message"
            required
            @clear-error="errors.message = ''"
          />

          <!-- Footer -->
          <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
            <p class="text-xs opacity-60 font-medium" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
              {{ t('contact.form.helper') }}
            </p>
            <button
              type="submit"
              class="contact-form__submit group"
              :disabled="sending"
            >
              <span v-if="sending" class="inline-flex items-center gap-2">
                <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                ...
              </span>
              <span v-else>{{ t('contact.form.submit') }}</span>
            </button>
          </div>
        </form>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Clean Form container */
.contact-form {
  position: relative;
  border: 1px solid var(--color-border-accent);
  border-radius: 16px;
  background: var(--color-surface-card);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.contact-form:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

/* Submit button — clean */
.contact-form__submit {
  position: relative;
  padding: 0.75rem 2rem;
  background: var(--color-accent);
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border: none;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-form__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.15), 0 0 12px var(--color-accent-soft);
  background: var(--color-accent-soft);
}

.contact-form__submit:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.contact-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
