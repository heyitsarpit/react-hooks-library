import { useEffect, useRef } from 'react'

/**
 * Returns the value of the argument from the previous render
 * @param {T} value
 * @returns {T | undefined} previous value
 * @see https://react-hooks-library.vercel.app/core/usePrevious
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
