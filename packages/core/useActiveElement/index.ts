import { useState } from 'react'

import { _document } from '../_ssr.config'
import { useEventListener } from '../useEventListener'

/**
 * Reactive document.activeElement, returns a reference to current active element
 *
 * @returns current active element (DOM node)
 **/
export function useActiveElement() {
  const [activeElement, setActiveElement] = useState(
    () => _document?.activeElement
  )

  useEventListener(
    'focus',
    () => setActiveElement(_document?.activeElement),
    true
  )

  useEventListener('blur', () => setActiveElement(null), true)

  return { activeElement }
}
