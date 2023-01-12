import { Fn } from '@react-hooks-library/shared'
import { useEffect } from 'react'

/**
 * Run a function when component is unmounted.
 *
 * @deprecated This hook breaks in React 18's strict mode, since it's not idempotent
 *
 * @param callback function to be executed
 */
export function useUnMount(func: Fn) {
  useEffect(() => {
    return func
  }, [func])
}
