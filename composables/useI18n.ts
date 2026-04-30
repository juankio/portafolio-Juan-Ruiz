import { messages, defaultLocale } from '~/i18n/messages'

export const useI18n = () => {
  const locale = useState('ui-locale', () => defaultLocale)
  const availableLocales = Object.keys(messages)

  const currentMessages = computed(() => messages[locale.value] || messages.en)

  const setLocale = (code: string) => {
    locale.value = availableLocales.includes(code) ? code : 'en'
  }

  // Hacer que t sea reactivo: si se usa en un template, Vue debe rastrear la dependencia de currentMessages.
  // En Vue, si pasas una función pura al template (ej: t('llave')), y la función lee una ref (currentMessages.value), 
  // la vista se re-renderizará cuando la ref cambie.
  const t = (path: string): any => {
    return path.split('.').reduce((acc: any, key) => (acc ? acc[key as keyof typeof acc] : undefined), currentMessages.value) ?? path
  }

  return {
    locale,
    setLocale,
    t,
    messages: currentMessages,
    availableLocales
  }
}
