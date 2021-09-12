import { useRef, useState } from 'react'

import { _navigator } from '../_ssr.config'
import { useEventListener } from '../useEventListener'
import { useMount } from '../useMount'

export type NetworkEffectiveType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

export interface NetworkInformation extends EventTarget {
  readonly type?: ConnectionType
  readonly effectiveType?: NetworkEffectiveType
  readonly downlinkMax?: number
  readonly downlink?: number
  readonly rtt?: number
  readonly saveData?: boolean
  onchange?: EventListener
}

/**
 * Reactive Network status.
 *
 * @see https://react-hooks-library.vercel.app/core/useNetwork
 */
export function useNetwork() {
  const [isSupported, setIsSupported] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  // TODO: Explore if we can remove all these state updates with a single rerender
  const [saveData, setSaveData] = useState<boolean | undefined>(false)
  const [offlineAt, setOfflineAt] = useState<number | undefined>(undefined)
  const [downlink, setDownlink] = useState<number | undefined>(undefined)
  const [downlinkMax, setDownlinkMax] = useState<number | undefined>(undefined)
  const [rtt, setRtt] = useState<number | undefined>(undefined)
  const [effectiveType, setEffectiveType] =
    useState<NetworkEffectiveType>(undefined)
  const [type, setType] = useState<ConnectionType>('unknown')

  const connection = useRef(_navigator?.connection as NetworkInformation)

  useMount(() => {
    setIsSupported(!!_navigator?.connection)

    if (!_navigator) return

    setIsOnline(_navigator.onLine)
    setOfflineAt(isOnline ? undefined : Date.now())

    if (!connection.current) return

    const update = () => {
      setSaveData(connection.current.saveData)
      setDownlink(connection.current.downlink)
      setDownlinkMax(connection.current.downlinkMax)
      setRtt(connection.current.rtt)
      setEffectiveType(connection.current.effectiveType)
      setType(connection.current.type ?? 'unknown')
    }

    update()
    connection.current.onchange = update
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
    saveData,
    rtt,
    downlink,
    downlinkMax,
    effectiveType,
    type
  }
}
