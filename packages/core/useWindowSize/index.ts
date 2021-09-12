import { useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useMount } from '../useMount'

export interface WindowSizeOptions {
  initialWidth?: number
  initialHeight?: number
}

/**
 * Reactive window size.
 *
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useWindowSize
 */
export function useWindowSize({
  initialWidth = Infinity,
  initialHeight = Infinity
}: WindowSizeOptions = {}) {
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)

  useMount(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  })

  useEventListener(
    'resize',
    () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    },
    { passive: true }
  )

  return { width, height }
}
