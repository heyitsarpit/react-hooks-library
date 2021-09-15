import { useState } from 'react'

import { useMount } from '../useMount'

/**
 * Hook that returns whether or not the component has mounted.
 * Useful in SSR frameworks like Next or Gatsby.
 *
 * @returns hasMounted
 */
export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false)

  useMount(() => {
    setHasMounted(true)
  })

  return hasMounted
}
