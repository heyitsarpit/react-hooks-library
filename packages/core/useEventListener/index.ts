import {
  Fn,
  isClient,
  isRef,
  isString,
  MaybeRef,
  noop
} from '@react-hooks-library/shared'
import { MutableRefObject, useEffect, useRef } from 'react'

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
  let cleanup = noop

  useEffect(() => {
    savedListener.current = listener
  }, [listener])

  useEffect(() => {
    if (!isClient && !target) return

    const el = isRef(target)
      ? (target as MutableRefObject<EventTarget>).current
      : (target as EventTarget)

    el.addEventListener(event, savedListener.current, options)
    cleanup = () => {
      el.removeEventListener(event, savedListener.current, options)
    }

    return cleanup
  }, [event, target, options])

  return cleanup
}
