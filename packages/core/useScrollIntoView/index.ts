import { isFunction, MaybeRef, unRef } from '@react-hooks-library/shared'

import { useMount } from '../useMount'

export interface UseScrollIntoViewOptions extends ScrollIntoViewOptions {
  /**
   * Defines vertical alignment.
   * One of `'start'`, `'center'`, `'end'`, or `'nearest'`
   *
   * @default 'start'
   */
  block?: ScrollLogicalPosition

  /**
   * Defines horizontal alignment.
   * One of `start`, `center`, `end`, or `nearest`. Defaults to nearest.
   *
   * @default 'nearest'
   */
  inline?: ScrollLogicalPosition

  /**
   * Defines the transition animation.
   * One of 'auto' or 'smooth'.
   *
   * @default 'auto'
   */
  behavior?: ScrollBehavior

  /**
   * The margin around the element to make sure it's visible.
   *
   * @default '0px'
   */
  scrollMargin?: string

  /**
   * The condition to decide if the element should be scrolled into view.
   *
   * @default true
   */
  predicate?: boolean | (() => boolean)
}

/**
 *
 * A hook to scroll an element into view on mounting.
 *
 * @param options {UseScrollIntoViewOptions}
 *
 * @see https://react-hooks-library.vercel.app/core/useScrollIntoView
 */
export function useScrollIntoView(
  target: MaybeRef<HTMLElement | null | undefined>,
  options: UseScrollIntoViewOptions = {}
) {
  const {
    behavior = 'auto',
    block = 'start',
    inline = 'nearest',
    scrollMargin = '0px',
    predicate = true
  } = options

  useMount(() => {
    const el = unRef(target)

    if (!(el && (isFunction(predicate) ? predicate() : predicate))) {
      return
    }

    el.style.scrollMargin = scrollMargin
    el.scrollIntoView({
      behavior,
      block,
      inline
    })
  })
}
