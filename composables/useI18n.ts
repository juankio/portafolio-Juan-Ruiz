import { messages, defaultLocale } from '~/i18n/messages'
import { computed } from 'vue'

// Estado global reactivo para que todos los componentes se actualicen al instante
const globalLocale = ref(defaultLocale)

export const useI18n = () => {
  const localeCookie = useCookie('ui-locale', { default: () => defaultLocale, watch: true })
  
  // Sincronizar cookie con estado global al montar en cliente
  if (process.client) {
    globalLocale.value = localeCookie.value
  } else {
    // SSR
    globalLocale.value = localeCookie.value || defaultLocale
  }

  const availableLocales = Object.keys(messages)

  const currentMessages = computed(() => messages[globalLocale.value as keyof typeof messages] || messages.en)

  const setLocale = (code: string) => {
    if (availableLocales.includes(code)) {
      globalLocale.value = code
      localeCookie.value = code
    }
  }

  const t = (path: string): string | string[] | any => {
    return path.split('.').reduce((acc: any, key) => (acc ? acc[key as keyof typeof acc] : undefined), currentMessages.value) ?? path
  }

  return {
    locale: globalLocale,
    setLocale,
    t,
    messages: currentMessages,
    availableLocales
  }
}
