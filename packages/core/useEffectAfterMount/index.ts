import { useEffect, useRef } from 'react'

/**
 * A useEffect hook does that not run on mount, but only on subsequent updates.
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
    if (isMounted.current) {
      effect()
    }

    isMounted.current = true
  }, deps)
}
