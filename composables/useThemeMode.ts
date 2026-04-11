export function useThemeMode() {
  const isLight = useState<boolean>('isLight', () => false)
  const storageKey = 'theme-mode'

  const applyThemeClass = (light: boolean) => {
    if (!process.client) return
    const root = document.documentElement
    if (light) {
      root.classList.add('theme-light')
    } else {
      root.classList.remove('theme-light')
    }
  }

  const toggleMode = () => {
    isLight.value = !isLight.value
  }

  if (process.client) {
    onMounted(() => {
      const saved = localStorage.getItem(storageKey)
      if (saved === 'light') {
        isLight.value = true
      } else if (saved === 'dark') {
        isLight.value = false
      }
      applyThemeClass(isLight.value)
    })

    watch(isLight, (value) => {
      localStorage.setItem(storageKey, value ? 'light' : 'dark')
      applyThemeClass(value)
    })
  }

  return { isLight, toggleMode }
}
