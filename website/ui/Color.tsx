import { useEffect, useRef, useState } from 'react'

import { useTheme } from './ThemeProvider'

export const Color = ({ className = '', varName = '' }) => {
  const [color, setColor] = useState('')
  const ref = useRef()
  const { theme } = useTheme()

  useEffect(() => {
    const color = getComputedStyle(ref.current).getPropertyValue(
      'background-color'
    )
    setColor(color)
  }, [theme])

  return (
    <div className="flex items-center gap-5 font-mono text-sm">
      <div
        ref={ref}
        className={`w-12 h-12 rounded-full ring-1 ring-trueGray-200 dark:ring-warmGray-800 ${className}`}></div>
      <div>
        <div>{varName}</div>
        <div>{color}</div>
      </div>
    </div>
  )
}
