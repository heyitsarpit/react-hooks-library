import { MaybeRef, round, unRef } from '@react-hooks-library/shared'

import { _document } from '../_ssr.config'
import { useEventListener } from '../useEventListener'

/**
 * Reactive scroll values for a react ref or a dom node
 *
 * @param target - dom node or react ref
 * @param callback - callback to run on scroll
 *
 * @see https://react-hooks-library.vercel.app/core/useScroll
 */
export function useScroll(
  target: MaybeRef<Element | null | undefined> = _document?.documentElement,
  callback: (coords: { scrollX: number; scrollY: number }) => void
) {
  const getPositions = () => {
    const el = unRef(target)
    if (!el) return

    return {
      x: round(el.scrollLeft / (el.scrollWidth - el.clientWidth)),
      y: round(el.scrollTop / (el.scrollHeight - el.clientHeight))
    }
  }

  useEventListener(
    target,
    'scroll',
    () => {
      const newScrollValues = getPositions()
      if (!newScrollValues) return

      const { x, y } = newScrollValues
      callback({ scrollX: x, scrollY: y })
    },
    {
      capture: false,
      passive: true
    }
  )
}
