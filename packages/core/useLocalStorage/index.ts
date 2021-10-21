import { isFunction } from '@react-hooks-library/shared'
import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

import { useMount } from '../useMount'

/**
 * Modified `useState` hook that syncs with localStorage.
 *
 * @param key
 * @param initialValue
 *
 * @see https://react-hooks-library.vercel.app/core/useLocalStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState(initialValue)

  useMount(() => {
    try {
      const item = localStorage.getItem(key)
      item && setStoredValue(JSON.parse(item))
    } catch (error) {
      console.error(error)
    }
  })

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = isFunction(value) ? value(storedValue) : value

      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
