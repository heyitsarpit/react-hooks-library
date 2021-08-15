import { useState } from 'react'

import { useEventListener } from '../useEventListener'

/**
 * Reactive document.activeElement, returns a reference to current active element
 *
 * @returns current active element (DOM node)
 **/
export function useActiveElement() {
  const [activeElement, setActiveElement] = useState(
    () => document.activeElement
  )

  useEventListener(
    'focus',
    () => setActiveElement(document.activeElement),
    true
  )

  useEventListener('blur', () => setActiveElement(null), true)

  return { activeElement }
}
