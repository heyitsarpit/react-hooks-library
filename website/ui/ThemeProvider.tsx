import React, { createContext } from 'react'
import { useContext } from 'react'
import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeContextProps = {
  theme: Theme
  switchTheme: () => void
}
const ThemeContext = createContext<ThemeContextProps>({
  theme: 'dark',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  switchTheme: () => {}
})

type Props = { children: React.ReactNode }

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<Theme>('dark')

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
