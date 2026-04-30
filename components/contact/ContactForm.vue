<script setup lang="ts">
import { inject, ref } from 'vue'
const isLight = inject('isLight', ref(false))
import SpraySplatter from '~/components/graffiti/SpraySplatter.vue'
import PaintDrip from '~/components/graffiti/PaintDrip.vue'


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
    toast.add({ title: t('contact.validation.success'), description: t('contact.validation.successDesc'), color: 'emerald' })
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
        <div v-if="sent" key="success" class="flex flex-col items-center justify-center gap-5 py-10 text-center">
          <!-- Spray reveal check -->
          <div class="contact-form__success-icon">
            <svg viewBox="0 0 60 60" class="w-16 h-16">
              <circle cx="30" cy="30" r="28" fill="none" stroke="var(--color-accent)" stroke-width="2" opacity="0.3" />
              <circle cx="30" cy="30" r="28" fill="var(--color-accent-soft)" />
              <path
                d="M 18 30 L 26 38 L 42 22"
                fill="none"
                stroke="var(--color-accent)"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <SpraySplatter class="absolute -top-4 -right-4" size="sm" :opacity="0.15" />
          </div>

          <h3 class="text-xl font-bold text-spray" :class="isLight ? 'text-slate-700' : 'text-white'">
            {{ t('contact.validation.success') }}
          </h3>
          <p class="text-sm" :class="isLight ? 'text-slate-500' : 'text-slate-400'" style="letter-spacing: 0.03em">
            {{ t('contact.validation.successDesc') }}
          </p>
          <button
            type="button"
            class="border-sketchy px-5 py-2 text-sm font-bold transition-all hover:scale-105"
            :class="isLight ? 'text-slate-600' : 'text-slate-300'"
            @click="resetForm"
          >
            {{ t('contact.form.sendAnother') }}
          </button>
        </div>

        <!-- Form -->
        <form v-else key="form" class="space-y-5" @submit.prevent="handleSubmit">
          <!-- Name -->
          <div class="contact-field">
            <label for="contact-name" class="contact-field__label font-marker" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
              <span class="contact-field__number" aria-hidden="true">01</span>
              {{ t('contact.form.nameLabel') }}
            </label>
            <div class="contact-field__input-wrap">
              <UInput
                id="contact-name"
                v-model="name"
                :placeholder="t('contact.form.namePlaceholder')"
                size="lg"
                variant="none"
                class="contact-field__input"
                :ui="{ base: 'w-full bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-var(--color-accent) outline-none rounded-md transition-all' }"
                required
                @input="errors.name = ''"
              />
              <div class="contact-field__line" />
            </div>
            <p v-if="errors.name" class="contact-field__error font-marker" role="alert">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="contact-field">
            <label for="contact-email" class="contact-field__label font-marker" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
              <span class="contact-field__number" aria-hidden="true">02</span>
              {{ t('contact.form.emailLabel') }}
            </label>
            <div class="contact-field__input-wrap">
              <UInput
                id="contact-email"
                v-model="email"
                type="email"
                :placeholder="t('contact.form.emailPlaceholder')"
                size="lg"
                variant="none"
                class="contact-field__input"
                :ui="{ base: 'w-full bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-var(--color-accent) outline-none overflow-x-auto truncate rounded-md transition-all' }"
                required
                @input="errors.email = ''"
              />
              <div class="contact-field__line" />
            </div>
            <p v-if="errors.email" class="contact-field__error font-marker" role="alert">{{ errors.email }}</p>
          </div>

          <!-- Message -->
          <div class="contact-field">
            <div class="flex items-center justify-between">
              <label for="contact-message" class="contact-field__label font-marker" :class="isLight ? 'text-slate-600' : 'text-slate-300'">
                <span class="contact-field__number" aria-hidden="true">03</span>
                {{ t('contact.form.messageLabel') }}
              </label>
              <span class="text-[0.6rem] font-marker text-[var(--color-accent)] opacity-60" aria-live="polite">
                {{ message.length }}/{{ maxMessage }}
              </span>
            </div>
            <div class="contact-field__input-wrap">
              <UTextarea
                id="contact-message"
                v-model="message"
                :rows="4"
                :maxlength="maxMessage"
                :placeholder="t('contact.form.messagePlaceholder')"
                variant="none"
                class="contact-field__input"
                :ui="{ base: 'w-full bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-var(--color-accent) outline-none resize-none rounded-md transition-all' }"
                required
                @input="errors.message = ''"
              />
              <div class="contact-field__line" />
            </div>
            <p v-if="errors.message" class="contact-field__error font-marker" role="alert">{{ errors.message }}</p>
          </div>

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

/* Field group */
.contact-field {
  position: relative;
}

/* Label — marker style */
.contact-field__label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

/* Big faded number */
.contact-field__number {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-accent);
  opacity: 0.25;
  line-height: 1;
}

/* Input wrapper with underline */
.contact-field__input-wrap {
  position: relative;
}

.contact-field__input :deep(input),
.contact-field__input :deep(textarea) {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  font-size: 0.95rem;
  color: var(--color-text-primary);
  letter-spacing: 0.02em;
  text-overflow: clip !important;
}

.contact-field__input :deep(input)::placeholder,
.contact-field__input :deep(textarea)::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.4;
  font-style: italic;
}

/* Spray paint underline */
.contact-field__line {
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-accent) 0px,
    var(--color-accent) 8px,
    transparent 8px,
    transparent 12px,
    var(--color-accent) 12px,
    var(--color-accent) 22px,
    transparent 22px,
    transparent 25px
  );
  opacity: 0.3;
  border-radius: 1px;
  transition: opacity 0.2s ease;
}

.contact-field__input-wrap:focus-within .contact-field__line {
  opacity: 0.8;
  filter: drop-shadow(0 0 4px var(--color-accent));
}

/* Error text */
.contact-field__error {
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-error, #ef4444);
  margin-top: 0.35rem;
  opacity: 0.9;
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

/* Success icon */
.contact-form__success-icon {
  position: relative;
  animation: spray-reveal 0.6s var(--ease-spring) forwards;
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
