import { usePreferredColorScheme } from '@react-hooks-library/core'
import { noop } from '@react-hooks-library/shared'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextProps = {
  theme: Theme
  switchTheme: () => void
}
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  switchTheme: noop
})

type Props = { children: React.ReactNode }

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>('dark')
  const preferredTheme = usePreferredColorScheme()

  const renderCount = useRef(0)

  useEffect(() => {
    renderCount.current += 1
  })

  useEffect(() => {
    const theme = (document.body.getAttribute('class') as Theme) || 'dark'
    setTheme(theme)
  }, [])

  useEffect(() => {
    const bodyClass = document.body.classList

    if (theme === 'dark') {
      bodyClass.remove('light')
      bodyClass.add('dark')
    } else {
      bodyClass.remove('dark')
      bodyClass.add('light')
    }

    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    /**
     * We don't want to switch theme on first few renders
     * only when user switches system theme
     */
    if (renderCount.current <= 2) return
    preferredTheme === 'dark' ? setTheme('dark') : setTheme('light')
  }, [preferredTheme])

  const switchTheme = () =>
    theme === 'light' ? setTheme('dark') : setTheme('light')

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
