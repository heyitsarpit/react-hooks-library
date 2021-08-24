import { isClient, isRef, MaybeRef } from '@react-hooks-library/shared'
import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

import { useUnMount } from '../useUnMount'

/**
 * Watch for changes being made to the DOM tree.
 *
 * @param target - React ref or DOM node
 * @param callback - callback to execute when mutations are observed
 * @param options - Options passed to mutation observer
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver MutationObserver MDN
 * @see https://react-hooks-library.vercel.app/core/useMutationObserver
 */
export function useMutationObserver(
  target: MaybeRef<HTMLElement | null>,
  callback: MutationCallback,
  options: MutationObserverInit = {}
) {
  const observer = useRef<MutationObserver | null>(null)
  const isSupported = useRef<boolean>(
    isClient && 'IntersectionObserver' in window
  )

  const stop = useCallback(() => {
    if (!observer.current) return

    observer.current.disconnect()
    observer.current = null
  }, [])

  useUnMount(stop)

  useEffect(() => {
    const el = isRef(target)
      ? (target as MutableRefObject<HTMLElement | null>).current
      : (target as HTMLElement | null)

    if (!(isSupported.current && el)) return

    observer.current = new window.MutationObserver(callback)
    observer.current?.observe(el, options)

    return stop
  }, [callback, stop, options, target])

  return {
    isSupported: isSupported.current,
    stop
  }
}
