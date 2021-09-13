import { useState } from 'react'

import { useEventListener } from '../useEventListener'
import { useMount } from '../useMount'

/**
 * Reactive online status
 *
 * @see https://react-hooks-library.vercel.app/core/useOnline
 */
export function useOnline() {
  const [online, setOnline] = useState(false)

  useMount(() => {
    setOnline(navigator.onLine)
  })

  useEventListener('offline', () => {
    setOnline(false)
  })

  useEventListener('online', () => {
    setOnline(true)
  })

  return online
}
