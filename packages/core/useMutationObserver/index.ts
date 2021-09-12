import { isClient, MaybeRef, unRef } from '@react-hooks-library/shared'
import { useEffect, useRef } from 'react'

import { _window } from '../_ssr.config'
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
  target: MaybeRef<Element | null | undefined>,
  callback: MutationCallback,
  options: MutationObserverInit = {}
) {
  const observer = useRef<MutationObserver | null>(null)
  const isSupported = isClient && !!_window?.IntersectionObserver

  const stop = () => {
    if (!observer.current) return

    observer.current.disconnect()
    observer.current = null
  }

  useUnMount(stop)

  useEffect(() => {
    const el = unRef(target)

    if (!(isSupported && el && _window)) return

    observer.current = new _window.MutationObserver(callback)
    observer.current?.observe(el, options)

    return stop
  }, [callback, stop, options, target])

  return {
    isSupported,
    stop
  }
}
