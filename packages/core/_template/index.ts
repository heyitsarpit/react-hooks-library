import { useState } from 'react'

export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const inc = (by = 1) => setCount((c) => c + by)
  const dec = (by = 1) => setCount((c) => c - by)
  const get = () => count
  const set = (val: number) => setCount(val)
  const reset = (val = initialValue) => {
    initialValue = val
    return set(val)
  }

  return { count, inc, dec, get, set, reset }
}
