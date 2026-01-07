export function useThemeMode() {
  const isLight = useState<boolean>('isLight', () => false)
  const storageKey = 'theme-mode'

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
    })

    watch(isLight, (value) => {
      localStorage.setItem(storageKey, value ? 'light' : 'dark')
    })
  }

  return { isLight, toggleMode }
}
