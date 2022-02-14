import { useEffect, useRef } from 'react'

/**
 * Run a function repeatedly at a specified interval.
 *
 * @see https://react-hooks-library.vercel.app/core/useInterval
 */
export function useInterval<T extends () => void>(
  callback: T,
  delay: number,
  immediate = false
) {
  const savedCallback = useRef(callback)

  useEffect(() => {
    savedCallback.current = callback

    immediate && callback()
  }, [callback, immediate])

  useEffect(() => {
    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}
