import { Fn } from '@react-hooks-library/shared'
import { useLayoutEffect } from 'react'

/**
 * Run a function synchronously when a component is mounted and after DOM is painted.
 *
 * @deprecated This hook breaks in React 18's strict mode, since it's not idempotent
 *
 * @param callback function to be executed
 */
export function useMountSync(callback: Fn) {
  useLayoutEffect(callback, [])
}
