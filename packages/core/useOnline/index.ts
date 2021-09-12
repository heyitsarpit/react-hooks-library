import { useState } from 'react'

import { useMount } from '..'
import { useEventListener } from '../useEventListener'

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
