import type { MaybeRef } from '@react-hooks-library/shared'
import { unRef } from '@react-hooks-library/shared'

import { useEventListener } from '../useEventListener'
import { _window } from '../_ssr.config'

export type ClickOutsideEvents = Pick<
  WindowEventMap,
  | 'mousedown'
  | 'mouseup'
  | 'touchstart'
  | 'touchend'
  | 'pointerdown'
  | 'pointerup'
>
export interface ClickOutsideOptions<E extends keyof ClickOutsideEvents> {
  event?: E
}

/**
 * Listen for clicks outside of an element.
 *
 * @param target
 * @param handler
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/onClickOutside
 */
export function useClickOutside<
  E extends keyof ClickOutsideEvents = 'pointerdown'
>(
  target: MaybeRef<Element | null | undefined>,
  handler: (evt: ClickOutsideEvents[E]) => void,
  options: ClickOutsideOptions<E> = {}
) {
  const { event = 'pointerdown' } = options

  const listener = (event: ClickOutsideEvents[E]) => {
    const el = unRef(target)
    if (!el) return

    if (el === event.target || event.composedPath().includes(el)) return

    handler(event)
  }

  return useEventListener(_window, event, listener, { passive: true })
}
