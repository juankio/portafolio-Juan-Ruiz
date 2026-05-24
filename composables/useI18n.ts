import { messages, defaultLocale } from '~/i18n/messages'

export const useI18n = () => {
  // Use useState to ensure cross-component reactivity that works properly with SSR
  const locale = useState('ui-locale-state', () => defaultLocale)
  const localeCookie = useCookie('ui-locale', { default: () => defaultLocale })
  
  if (process.server && localeCookie.value) {
    locale.value = localeCookie.value
  } else if (process.client && localeCookie.value && locale.value !== localeCookie.value) {
    locale.value = localeCookie.value
  }

  const availableLocales = Object.keys(messages)

  const currentMessages = computed(() => messages[locale.value as keyof typeof messages] || messages.en)

  const setLocale = (code: string) => {
    if (availableLocales.includes(code)) {
      locale.value = code
      localeCookie.value = code
    }
  }

  const t = (path: string): string | string[] | any => {
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
