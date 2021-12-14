import { MaybeRef, noop, unRef } from '@react-hooks-library/shared'
import { useCallback, useEffect, useRef, useState } from 'react'

import { _document } from '../_ssr.config'
import { useIsSupported } from '../useIsSupported'
import { useUnMount } from '../useUnMount'

export interface IntersectionObserverOptions {
  /**
   * The Element or Document whose bounds are used as the bounding box when testing for intersection.
   *
   * @default document
   */
  root?: MaybeRef<Element | Document | undefined | null>

  /**
   * A string which specifies a set of offsets to add to the root's bounding_box when calculating intersections.
   *
   * @default '0px'
   */
  rootMargin?: string

  /**
   * Either a single number or an array of numbers between 0.0 and 1.
   *
   * @default 0
   */
  threshold?: number | number[]
}

/**
 * Reactive intersection observer.
 *
 * @param target - React ref or DOM node
 * @param options - Options passed to mutation observer
 * @param callback - callback to execute when mutations are observed
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver IntersectionObserver MDN
 * @see https://react-hooks-library.vercel.app/core/useIntersectionObserver
 */
export function useIntersectionObserver(
  target: MaybeRef<Element | undefined | null>,
  options: IntersectionObserverOptions = {},
  callback: IntersectionObserverCallback = noop
) {
  const { root = _document, rootMargin = '0px', threshold = 0 } = options

  const [inView, setInView] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null)
  const isSupported = useIsSupported(() => 'IntersectionObserver' in window)

  const observer = useRef<IntersectionObserver | null>(null)

  const stop = useCallback(() => {
    if (!observer.current) return

    observer.current.disconnect()
    observer.current = null
  }, [])

  useUnMount(stop)

  useEffect(() => {
    const el = unRef(target)
    const rootEl = unRef(root)

    if (!(isSupported && el && rootEl)) return

    observer.current = new window.IntersectionObserver(
      (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const thresholds = Array.isArray(threshold) ? threshold : [threshold]

        entries.forEach((entry) => {
          const inView =
            entry.isIntersecting &&
            thresholds.some((threshold) => entry.intersectionRatio >= threshold)

          setInView(inView)
          setEntry(entry)
        })
        callback(entries, observer)
      },
      {
        root: rootEl,
        rootMargin,
        threshold
      }
    )

    observer.current?.observe(el)

    return stop
  }, [callback, isSupported, root, rootMargin, stop, target, threshold])

  return {
    isSupported,
    stop,
    inView,
    entry
  }
}
