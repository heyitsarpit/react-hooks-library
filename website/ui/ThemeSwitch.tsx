import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { useTheme } from './ThemeProvider'

export function ThemeSwitch() {
  const { switchTheme, theme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Avoid initial transition when switching themes
  if (!hasMounted) {
    return <div className="w-10 h-10"></div>
  }

  return (
    <button
      onClick={switchTheme}
      className="flex items-center justify-center w-10 h-10 bg-transparent text-txt-1 hover:opacity-100 hover:bg-fg-1 hover:text-txt-2">
      <AnimatePresence initial={false} exitBeforeEnter>
        <motion.div
          key={theme}
          style={{
            originX: '50%',
            originY: '50%',
            transitionDuration: '50ms'
          }}
          initial={{ rotateZ: theme === 'light' ? -45 : 45, opacity: 0.6 }}
          animate={{ rotateZ: 0, opacity: 1 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                theme === 'light'
                  ? 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
                  : 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
              }></path>
          </svg>
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
