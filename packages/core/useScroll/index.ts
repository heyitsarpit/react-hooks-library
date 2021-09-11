import { MaybeRef, round, unRef } from '@react-hooks-library/shared'
import { useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useMount } from '../useMount'

/**
 * Reactive scroll values for a react ref or a dom node
 *
 * @param target - dom node or react ref
 *
 * @see https://react-hooks-library.vercel.app/core/useScroll
 */
export function useScroll(
  target: MaybeRef<Element | null | undefined> = document.documentElement
) {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const setPositions = () => {
    const el = unRef(target)
    if (!el) return

    setX(round(el.scrollLeft / (el.scrollWidth - el.clientWidth)))
    setY(round(el.scrollTop / (el.scrollHeight - el.clientHeight)))
  }

  useMount(() => {
    setPositions()
  })

  useEventListener(
    target,
    'scroll',
    () => {
      setPositions()
    },
    {
      capture: false,
      passive: true
    }
  )

  return { x, y }
}
