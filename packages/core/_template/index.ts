import { useCallback, useState } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const inc = useCallback((by = 1) => setCount((c) => c + by), [])
  const dec = useCallback((by = 1) => setCount((c) => c - by), [])
  const get = () => count
  const set = useCallback((val: number) => setCount(val), [])
  const reset = useCallback(
    (val = initialValue) => {
      return set(val)
    },
    [initialValue, set]
  )

  return { count, inc, dec, get, set, reset }
}
