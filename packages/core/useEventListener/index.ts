import {
  Fn,
  isClient,
  isString,
  MaybeRef,
  noop,
  unRef
} from '@react-hooks-library/shared'
import { useEffect, useRef } from 'react'

interface InferEventTarget<Events> {
  addEventListener(event: Events, fn?: any, options?: any): any
  removeEventListener(event: Events, fn?: any, options?: any): any
}

export type WindowEventName = keyof WindowEventMap
export type DocumentEventName = keyof DocumentEventMap

export type GeneralEventListener<E = Event> = {
  (evt: E): void
}

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 1: Omitted Window target
 *
 * @see https://react-hooks-library.vercel.app/core/useEventListener
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export function useEventListener<E extends keyof WindowEventMap>(
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  //   dependencies?: Ar ,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 2: Explicitly Window target
 *
 * @see https://react-hooks-library.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export function useEventListener<E extends keyof WindowEventMap>(
  target: Window,
  event: E,
  listener: (this: Window, ev: WindowEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 3: Explicitly Document target
 *
 * @see https://react-hooks-library.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export function useEventListener<E extends keyof DocumentEventMap>(
  target: Document,
  event: E,
  listener: (this: Document, ev: DocumentEventMap[E]) => any,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 4: Custom event target with event type infer
 *
 * @see https://react-hooks-library.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export function useEventListener<Names extends string, EventType = Event>(
  target: InferEventTarget<Names>,
  event: Names,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn

/**
 * Register listener using addEventListener when mounting, and removeEventListener automatically when un-mounting.
 *
 * Returns a cleanup function manually if you want to remove the listener manually.
 *
 * Overload 5: Custom event target fallback
 *
 * @see https://react-hooks-library.vercel.app/core/useEventListener
 * @param target
 * @param event
 * @param listener
 * @param options
 * @returns Clean up function for manual cleanup
 */
export function useEventListener<EventType = Event>(
  target: MaybeRef<EventTarget | null | undefined>,
  event: string,
  listener: GeneralEventListener<EventType>,
  options?: boolean | AddEventListenerOptions
): Fn

export function useEventListener(...args: any[]) {
  let target: MaybeRef<EventTarget | null | undefined> = window
  let event: string
  let listener: EventListener
  let options: boolean | AddEventListenerOptions

  isString(args[0])
    ? ([event, listener, options] = args)
    : ([target, event, listener, options] = args)

  const savedListener = useRef<EventListener>(listener)
  const cleanup = useRef(noop)

  useEffect(() => {
    savedListener.current = listener
  }, [listener])

  useEffect(() => {
    const el = unRef(target)

    if (!isClient || !el) return

    el.addEventListener(event, savedListener.current, options)
    cleanup.current = () => {
      el.removeEventListener(event, savedListener.current, options)
    }

    return cleanup.current
  }, [event, target, options])

  return cleanup.current
}
