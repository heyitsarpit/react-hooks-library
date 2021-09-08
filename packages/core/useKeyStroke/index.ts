import { isString, MaybeRef } from '@react-hooks-library/shared'
import { useEventListener } from '..'

export type Keys = string | string[]
export type KeyStrokeEventName = 'keydown' | 'keypress' | 'keyup'
export type KeyStrokeOptions = {
  eventName?: KeyStrokeEventName
  target?: MaybeRef<EventTarget>
  passive?: boolean
}

/**
 * Listen for keyboard keys being stroked.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyStroke(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  const { target = window, eventName = 'keydown', passive = false } = options

  const listener = (e: KeyboardEvent) => {
    if (isString(keys)) keys = [keys]
    if (keys.includes(e.key)) handler(e)
  }

  return useEventListener(target, eventName, listener, passive)
}

/**
 * Listen for keyboard keys on keydown.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyDown(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(keys, handler, { ...options, eventName: 'keydown' })
}

/**
 * Listen for keyboard keys on keypress.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyPressed(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(keys, handler, { ...options, eventName: 'keypress' })
}

/**
 * Listen for keyboard keys on keyup.
 *
 * @param keys
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onKeyStroke
 */
export function useKeyUp(
  keys: Keys,
  handler: (event: KeyboardEvent) => void,
  options: KeyStrokeOptions = {}
) {
  return useKeyStroke(keys, handler, { ...options, eventName: 'keyup' })
}
