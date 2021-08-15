import type { MutableRefObject } from 'react'

/**
 * Any function
 */
export type Fn = () => void

/**
 * Maybe it's a ref, or not.
 *
 * ```ts
 * type MaybeRef<T> = T | MutableRefObject<T>
 * ```
 */
export type MaybeRef<T> = T | MutableRefObject<T>
