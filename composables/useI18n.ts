import { messages, defaultLocale } from '~/i18n/messages'

export const useI18n = () => {
  const locale = useState('ui-locale', () => defaultLocale)
  const availableLocales = Object.keys(messages)

  const currentMessages = computed(() => messages[locale.value] || messages.en)

  const setLocale = (code: string) => {
    locale.value = availableLocales.includes(code) ? code : 'en'
  }

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
