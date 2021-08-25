import { isClient, MaybeRef, noop, unRef } from '@react-hooks-library/shared'
import { useCallback, useEffect, useRef, useState } from 'react'

import { useUnMount } from '../useUnMount'

export interface IntersectionObserverOptions {
  /**
   * The Element or Document whose bounds are used as the bounding box when testing for intersection.
   */
  root?: MaybeRef<Element | Document | undefined | null>

  /**
   * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
   */
  rootMargin?: string

  /**
   * Either a single number or an array of numbers between 0.0 and 1.
   */
  threshold?: number | number[]
}

/**
 * Reactive intersection observer.
 *
 * @param target - React ref or DOM node
 * @param callback - callback to execute when mutations are observed
 * @param options - Options passed to mutation observer
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver IntersectionObserver MDN
 * @see https://react-hooks-library.vercel.app/core/useIntersectionObserver
 */
export function useIntersectionObserver(
  target: MaybeRef<Element | undefined | null>,
  options: IntersectionObserverOptions = {},
  callback: IntersectionObserverCallback = noop
) {
  const { root = document, rootMargin = '0px', threshold = 0 } = options

  const [inView, setInView] = useState(false)

  const observer = useRef<IntersectionObserver | null>(null)
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
    const el = unRef(target)
    const rootEl = unRef(root)

    if (!(isSupported.current && el && rootEl)) return

    observer.current = new window.IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        callback(entries, observer)
        setInView(true)
      },
      {
        root: rootEl,
        rootMargin,
        threshold
      }
    )
    observer.current?.observe(el)

    return stop
  }, [callback, root, rootMargin, stop, target, threshold])

  return {
    isSupported: isSupported.current,
    stop,
    inView
  }
}
