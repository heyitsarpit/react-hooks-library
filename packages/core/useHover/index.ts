import { MaybeRef, unRef } from '@react-hooks-library/shared'
import { useEffect, useState } from 'react'

/**
 *
 * Detect if a dom element is hovered
 *
 * @param target - The element to listen to
 * @returns
 */
export function useHover(target: MaybeRef<EventTarget | null>) {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const el = unRef(target)

    if (!el) return

    const onMouseEnter = () => setIsHovered(true)
    const onMouseLeave = () => setIsHovered(false)

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)

    return () => {
      el.removeEventListener('mouseenter', onMouseEnter)
      el.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [target])

  return isHovered
}
