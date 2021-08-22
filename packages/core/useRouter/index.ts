import { useState } from 'react'

import { useEventListener } from '../useEventListener'

export interface Router {
  trigger: string
  state?: any
  length?: number
  hash?: string
  host?: string
  hostname?: string
  href?: string
  origin?: string
  pathname?: string
  port?: string
  protocol?: string
  search?: string
}

const buildState = (trigger: string): Router => {
  const { state, length } = window?.history || {}
  const {
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search
  } = window?.location || {}

  return {
    trigger,
    state,
    length,
    hash,
    host,
    hostname,
    href,
    origin,
    pathname,
    port,
    protocol,
    search
  }
}

/**
 * Reactive browser location.
 *
 * @see https://react-hooks-library.vercel.app/core/useDebounce
 *
 */
export function useRouter() {
  const [state, setState] = useState(() => buildState('load'))

  useEventListener(window, 'popstate', () => setState(buildState('popstate')), {
    passive: true
  })

  useEventListener(
    window,
    'hashchange',
    () => setState(buildState('hashchange')),
    { passive: true }
  )

  return state
}
