import { MutableRefObject } from 'react'

import { isRef } from './is'
import type { MaybeRef } from './types'

/**
 * Accepts either a ref object or a dom node and returns a dom node
 *
 * @param target - ref or a dom node
 * @returns dom noe
 */
export function unRef<T = HTMLElement>(target: MaybeRef<T>): T {
  const element = isRef(target)
    ? (target as MutableRefObject<T>).current
    : (target as T)

  return element
}
