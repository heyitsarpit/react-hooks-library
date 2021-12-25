import { isFunction } from '@react-hooks-library/shared'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useState } from 'react'

import { useMount } from '../useMount'

export type UseSessionStorageOptions = {
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
 * Modified `useState` hook that syncs with useSessionStorage.
 *
 * @param key
 * @param initialValue
 * @param options
 *
 * @see https://react-hooks-library.vercel.app/core/useSessionStorage
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: UseSessionStorageOptions
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState(initialValue)
  const { deserialize = JSON.parse, serialize = JSON.stringify } = options || {}

  useMount(() => {
    try {
      const item = sessionStorage.getItem(key)
      item && setStoredValue(deserialize(item))
    } catch (error) {
      console.error(error)
    }
  })

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value)
        sessionStorage.setItem(key, serialize(value))
      } catch (error) {
        console.error(error)
      }
    },
    [key, serialize]
  )

  return [storedValue, setValue]
}
