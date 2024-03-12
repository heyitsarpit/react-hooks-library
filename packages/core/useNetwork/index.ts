import { useRef, useState } from 'react'

import { _navigator } from '../_ssr.config'
import { useEventListener } from '../useEventListener'
import { useIsSupported } from '../useIsSupported'
import { useMount } from '../useMount'

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

type ConnectionType =
  | 'cellular2g'
  | 'cellular3g'
  | 'cellular4g'
  | 'bluetooth'
  | 'ethernet'
  | 'none'
  | 'wifi'
  | 'wimax'
  | 'other'
  | 'unknown'
  | undefined

export interface NetworkInformation extends EventTarget {
  readonly type?: ConnectionType
  readonly effectiveType?: NetworkEffectiveType
  readonly downlinkMax?: number
  readonly downlink?: number
  readonly rtt?: number
  readonly saveData?: boolean
  onchange?: EventListener
}

declare global {
  interface TNavigator extends Navigator {
    readonly connection: NetworkInformation
  }
}

/**
 * Reactive Network status.
 *
 * @see https://react-hooks-library.vercel.app/core/useNetwork
 */
export function useNetwork() {
  const isSupported = useIsSupported(
    () => !!(_navigator as TNavigator)?.connection
  )
  const [isOnline, setIsOnline] = useState(true)
  const [offlineAt, setOfflineAt] = useState<number | undefined>(undefined)

  const connection = useRef<NetworkInformation | undefined>(undefined)
  const rerender = useState({})[1]

  useMount(() => {
    if (!_navigator) return

    setIsOnline(_navigator.onLine)
    setOfflineAt(isOnline ? undefined : Date.now())

    const _connection = (_navigator as TNavigator)
      ?.connection as NetworkInformation
    if (!_connection) return

    connection.current = _connection
    connection.current.onchange = () => rerender({})
  })

  useEventListener('offline', () => {
    setIsOnline(false)
    setOfflineAt(Date.now())
  })

  useEventListener('online', () => {
    setIsOnline(true)
  })

  return {
    isSupported,
    isOnline,
    offlineAt,
    saveData: connection.current?.saveData,
    rtt: connection.current?.rtt,
    downlink: connection.current?.downlink,
    downlinkMax: connection.current?.downlinkMax,
    effectiveType: connection.current?.effectiveType,
    type: connection.current?.type
  }
}
