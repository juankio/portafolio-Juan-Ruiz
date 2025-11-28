export function useThemeMode() {
  const isLight = useState<boolean>('isLight', () => false)

  const toggleMode = () => {
    isLight.value = !isLight.value
  }

  return { isLight, toggleMode }
}
