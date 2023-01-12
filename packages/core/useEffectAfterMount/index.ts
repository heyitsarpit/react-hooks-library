import { useEffect, useRef } from 'react'

/**
 * A useEffect hook does that not run on mount, but only on subsequent updates.
 *
 * @deprecated This hook breaks in React 18's strict mode, since it's not idempotent
 *
 * @param effect
 * @param deps
 *
 * @see https://react-hooks-library.vercel.app/core/useEffectAfterMount
 */
export function useEffectAfterMount(
  effect: React.EffectCallback,
  deps?: React.DependencyList | undefined
) {
  const isMounted = useRef(false)

  useEffect(() => {
    let cleanup: void | (() => void) = undefined

    if (isMounted.current) {
      cleanup = effect()
    }

    isMounted.current = true

    return cleanup
  }, deps)
}
