import { useLayoutEffect, useState } from 'react'

type Theme = 'dark' | 'light'

export function ThemeSwitch() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [hasMounted, setHasMounted] = useState(false)

  useLayoutEffect(() => {
    const theme = (document.body.getAttribute('class') as Theme) || 'dark'
    setHasMounted(true)
    setTheme(theme)
  }, [])

  useLayoutEffect(() => {
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

  if (!hasMounted) {
    return null
  }

  return (
    <button
      onClick={switchTheme}
      className="px-2 py-1 bg-trueGray-500 text-trueGray-200">
      {theme === 'light' ? 'light' : 'dark'}
    </button>
  )
}
