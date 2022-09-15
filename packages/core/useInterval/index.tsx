import { useEffect, useRef } from 'react'

type UseIntervalOptions = {
  immediate: boolean
  paused: boolean
}

/**
 * Run a function repeatedly at a specified interval.
 *
 * @see https://react-hooks-library.vercel.app/core/useInterval
 */
export function useInterval<T extends () => void>(
  callback: T,
  delay: number,
  options?: Partial<UseIntervalOptions>
) {
  const { immediate = false, paused = false } = options || {}
  const savedCallback = useRef(callback)
  const tickId = useRef<NodeJS.Timer>()

  useEffect(() => {
    savedCallback.current = callback

    if (!paused && immediate) {
      callback()
    }
  }, [callback, immediate, paused])

  useEffect(() => {
    if (tickId.current && paused) {
      clearInterval(tickId.current)
      return
    }

    tickId.current = setInterval(() => savedCallback.current(), delay)

    return () => tickId.current && clearInterval(tickId.current)
  }, [delay, paused])
}
