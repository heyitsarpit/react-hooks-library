import { useEffect, useState } from 'react'

export type Position = { x: number; y: number }

export interface MouseOptions {
  /**
   * Mouse position based by page or client
   *
   * @default 'client'
   */
  type?: 'page' | 'client'

  /**
   * Listen to `touchmove` events
   *
   * @default true
   */
  touch?: boolean

  /**
   * Reset to initial value when `touchend` event fired
   *
   * @default false
   */
  resetOnTouchEnds?: boolean

  /**
   * Initial values
   */
  initialValue?: Position
}

export type MouseSource = 'mouse' | 'touch' | null

/**
 *
 * Reactive mouse position based by page or client
 *
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useMouse
 */
export function useMouse(options: MouseOptions = {}) {
  const {
    touch = true,
    type = 'client',
    resetOnTouchEnds = false,
    initialValue = { x: 0, y: 0 }
  } = options

  const [x, setX] = useState(initialValue.x)
  const [y, setY] = useState(initialValue.y)

  const [source, setSource] = useState<MouseSource>(null)

  useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      setSource('mouse')

      if (type === 'page') {
        setX(event.pageX)
        setY(event.pageY)
      } else if (type === 'client') {
        setX(event.clientX)
        setY(event.clientY)
      }
    }

    const reset = () => {
      setX(initialValue.x)
      setY(initialValue.y)
    }

    const touchHandler = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        setSource('touch')
        if (type === 'page') {
          setX(event.touches[0].pageX)
          setY(event.touches[0].pageY)
        } else if (type === 'client') {
          setX(event.touches[0].clientX)
          setY(event.touches[0].clientY)
        }
      }
    }

    window.addEventListener('mousemove', mouseHandler, { passive: true })
    window.addEventListener('dragover', mouseHandler, { passive: true })

    if (touch) {
      window.addEventListener('touchstart', touchHandler, { passive: true })
      window.addEventListener('touchmove', touchHandler, { passive: true })

      if (resetOnTouchEnds)
        window.addEventListener('touchend', reset, { passive: true })
    }

    return () => {
      window.removeEventListener('mousemove', mouseHandler)
      window.removeEventListener('dragover', mouseHandler)

      if (touch) {
        window.removeEventListener('touchstart', touchHandler)
        window.removeEventListener('touchmove', touchHandler)

        if (resetOnTouchEnds) window.removeEventListener('touchend', reset)
      }
    }
  }, [initialValue.x, initialValue.y, resetOnTouchEnds, touch, type])

  return { x, y, source }
}
