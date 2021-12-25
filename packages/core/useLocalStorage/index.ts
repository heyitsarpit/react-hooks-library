import { useCallback } from 'react'
import { useState } from 'react'

import { useMount } from '../useMount'

export type UseLocalStorageOptions = {
  /**
   * Function for converting to string.
   *
   * @default JSON.stringify
   */
  serialize: (value: unknown) => string

  /**
   * Function to convert stored string to object value.
   *
   * @default JSON.parse
   */
  deserialize: (value: string) => unknown
}

/**
 * Modified `useState` hook that syncs with localStorage.
 *
 * @param key
 * @param initialValue
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useLocalStorage
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue)
  const { deserialize = JSON.parse, serialize = JSON.stringify } = options || {}

  useMount(() => {
    try {
      const item = localStorage.getItem(key)
      item && setStoredValue(deserialize(item))
    } catch (error) {
      console.error(error)
    }
  })

  const setValue = useCallback(
    (value: T) => {
      try {
        localStorage.setItem(key, serialize(value))
        setStoredValue(value)
      } catch (error) {
        console.error(error)
      }
    },
    [key, serialize]
  )

  return [storedValue, setValue]
}
