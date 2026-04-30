<script setup lang="ts">
import { inject, ref, reactive } from 'vue'
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'
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
    <!-- Spray deco -->
    <SpraySplatter class="absolute -top-4 -right-4" size="sm" :opacity="0.06" />
    <SpraySplatter class="absolute -bottom-6 -left-6" size="md" :opacity="0.04" color="var(--spray-cyan)" />

    <!-- Tape strips -->
    <div class="contact-form__tape contact-form__tape--left" aria-hidden="true" />
    <div class="contact-form__tape contact-form__tape--right" aria-hidden="true" />

    <!-- Pin -->
    <div class="absolute -top-[5px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--color-accent)] shadow-[0_2px_4px_rgba(0,0,0,0.3),inset_0_-2px_3px_rgba(0,0,0,0.2),0_0_8px_var(--color-accent)] z-20" aria-hidden="true" />

    <div class="relative z-10 p-6 sm:p-7 lg:p-8">
      <!-- Header sticker -->
      <div class="flex items-center justify-between mb-6">
        <span
          class="tag-sticker text-xs uppercase tracking-widest"
          style="transform: rotate(-1.5deg)"
        >
          {{ t('contact.form.messageLabel') }}
        </span>
        <PaintDrip class="absolute top-0 right-12" :count="1" :animated="true" />
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
            <p class="text-xs font-marker opacity-40" :class="isLight ? 'text-slate-500' : 'text-slate-400'">
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

    <!-- Bottom mark -->
    <div class="absolute bottom-2 right-4 font-marker text-[0.5rem] tracking-widest opacity-15 text-[var(--color-accent)]" aria-hidden="true">
      DROP A LINE ★
    </div>
  </div>
</template>

<style scoped>
/* Form container — poster on the wall */
.contact-form {
  position: relative;
  border: 2px solid var(--color-border-accent);
  border-radius: 4px 12px 6px 10px;
  background: var(--color-surface-card);
  backdrop-filter: blur(12px);
  box-shadow: var(--shadow-glow);
  transition: box-shadow 0.3s var(--ease-spring);
}

.contact-form:hover {
  box-shadow: var(--shadow-neon);
}

/* Tape strips */
.contact-form__tape {
  position: absolute;
  width: 50px;
  height: 14px;
  background: var(--color-accent);
  opacity: 0.6;
  z-index: 20;
  box-shadow: 1px 2px 3px rgba(0,0,0,0.25);
}

.contact-form__tape--left {
  top: -3px;
  left: 20px;
  transform: rotate(-2.5deg);
  border-radius: 1px;
}

.contact-form__tape--right {
  top: -3px;
  right: 20px;
  transform: rotate(1.5deg);
  border-radius: 1px;
}

/* Submit button — big spray tag */
.contact-form__submit {
  position: relative;
  padding: 0.75rem 2rem;
  background: var(--color-accent);
  color: white;
  font-family: "Permanent Marker", "Bangers", cursive;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: none;
  border-radius: 3px 10px 5px 12px;
  box-shadow: 3px 4px 0 rgba(0,0,0,0.35), 0 0 0 0 var(--color-accent);
  cursor: pointer;
  transition: all 0.2s var(--ease-spring);
}

.contact-form__submit:hover {
  transform: translateY(-2px) rotate(-1deg);
  box-shadow: 4px 6px 0 rgba(0,0,0,0.3), 0 0 16px var(--color-accent-soft);
}

.contact-form__submit:active {
  transform: translateY(1px);
  box-shadow: 1px 2px 0 rgba(0,0,0,0.4);
}

.contact-form__submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s var(--ease-spring);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}
</style>
