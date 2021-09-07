import { MaybeRef } from '@react-hooks-library/shared'
import { useEventListener } from '..'

export type Keys = string
export type KeyStrokeEventName = 'keydown' | 'keypress' | 'keyup'
export type KeyStrokeOptions = {
  eventName?: KeyStrokeEventName
  target?: MaybeRef<EventTarget>
  passive?: boolean
}

/**
 * Listen for keyboard keys being stroked.
 *
 * @param key
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyStroke(
  key: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  const { target = window, eventName = 'keydown', passive = false } = options

  const listener = (e: KeyboardEvent) => {
    if (e.key === key) handler(e)
  }

  return useEventListener(target, eventName, listener, passive)
}

/**
 * Listen for keyboard keys on keydown.
 *
 * @param key
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyDown(
  key: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(key, handler, { ...options, eventName: 'keydown' })
}

/**
 * Listen for keyboard keys on keypress.
 *
 * @param key
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyPressed(
  key: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(key, handler, { ...options, eventName: 'keypress' })
}

/**
 * Listen for keyboard keys on keyup.
 *
 * @param key
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyUp(
  key: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(key, handler, { ...options, eventName: 'keyup' })
}
