<script setup lang="ts">
import { inject } from 'vue'

const props = withDefaults(defineProps<{
  id: string
  label: string
  number: string
  modelValue: string
  type?: 'text' | 'email' | 'textarea'
  placeholder?: string
  error?: string
  maxlength?: number
  required?: boolean
}>(), {
  type: 'text',
  placeholder: '',
  error: '',
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'clear-error': []
}>()

const isLight = inject('isLight', false)
</script>

<template>
  <div class="contact-field">
    <div v-if="type === 'textarea'" class="flex items-center justify-between">
      <label :for="id" class="contact-field__label" :class="isLight ? 'text-slate-600' : 'text-slate-500'">
        <span class="contact-field__number" aria-hidden="true">{{ number }}</span>
        {{ label }}
      </label>
      <span v-if="maxlength" class="text-[0.7rem] text-[var(--color-accent)] opacity-60 font-medium" aria-live="polite">
        {{ modelValue.length }}/{{ maxlength }}
      </span>
    </div>
    <label v-else :for="id" class="contact-field__label" :class="isLight ? 'text-slate-600' : 'text-slate-500'">
      <span class="contact-field__number" aria-hidden="true">{{ number }}</span>
      {{ label }}
    </label>

    <div class="contact-field__input-wrap">
      <template v-if="type === 'textarea'">
        <UTextarea
          :id="id"
          :model-value="modelValue"
          @update:model-value="(val: string) => emit('update:modelValue', val)"
          :rows="4"
          :maxlength="maxlength"
          :placeholder="placeholder"
          variant="none"
          class="contact-field__input"
          :ui="{ base: 'w-full bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-var(--color-accent) outline-none resize-none rounded-md transition-all' }"
          :required="required"
          @input="emit('clear-error')"
        />
      </template>
      <template v-else>
        <UInput
          :id="id"
          :model-value="modelValue"
          @update:model-value="(val: string) => emit('update:modelValue', val)"
          :type="type"
          :placeholder="placeholder"
          size="lg"
          variant="none"
          class="contact-field__input"
          :ui="{ base: 'w-full bg-transparent border-0 focus-visible:ring-2 focus-visible:ring-var(--color-accent) outline-none overflow-x-auto truncate rounded-md transition-all' }"
          :required="required"
          @input="emit('clear-error')"
        />
      </template>
      <div class="contact-field__line" />
    </div>
    <p v-if="error" class="contact-field__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
/* Field group */
.contact-field {
  position: relative;
}

/* Label */
.contact-field__label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
}

/* Number */
.contact-field__number {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--color-accent);
  opacity: 0.4;
  line-height: 1;
}

/* Input wrapper */
.contact-field__input-wrap {
  position: relative;
  width: 100%;
}

.contact-field__input {
  width: 100%;
}

.contact-field__input :deep(input),
.contact-field__input :deep(textarea) {
  background: transparent !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  width: 100% !important;
  font-size: 0.95rem;
  color: var(--color-text-primary);
  text-overflow: clip !important;
}

.contact-field__input :deep(input)::placeholder,
.contact-field__input :deep(textarea)::placeholder {
  color: var(--color-text-secondary);
  opacity: 0.5;
}

/* Underline */
.contact-field__line {
  height: 1px;
  background: var(--color-border);
  opacity: 1;
  transition: all 0.3s ease;
}

.contact-field__input-wrap:focus-within .contact-field__line {
  background: var(--color-accent);
  height: 2px;
}

/* Error text */
.contact-field__error {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-error, #ef4444);
  margin-top: 0.35rem;
}
</style>
