import { isFunction } from '@react-hooks-library/shared'
import type { Dispatch, SetStateAction } from 'react'
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
): [T, Dispatch<SetStateAction<T>>] {
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

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = isFunction(value) ? value(storedValue) : value

      setStoredValue(valueToStore)
      localStorage.setItem(key, serialize(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue]
}
