import { Fn } from '@react-hooks-library/shared'
import { useEffect } from 'react'

/**
 * Run a function when component is unmounted.
 *
 * @param callback function to be executed
 */
export function useUnMount(func: Fn) {
  useEffect(() => {
    return func
  }, [func])
}
