import { useEffect, useState } from 'react'

/**
 * Used to debounce a quickly changing value.
 * Will return the latest value after a specific amount of time.
 *
 * @param {T} value
 * @param timeout
 * @returns {Readonly<T>} latest value
 * @see https://react-hooks-library.vercel.app/core/useDebounce
 */
export function useDebounce<T>(value: T, timeout: number): Readonly<T> {
  const [state, setState] = useState(value)

  useEffect(() => {
    const tick = setTimeout(() => setState(value), timeout)

    return () => clearTimeout(tick)
  }, [value, timeout])

  if (timeout <= 0) return value
  return state
}
