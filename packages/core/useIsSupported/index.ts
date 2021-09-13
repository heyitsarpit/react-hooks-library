import { useState } from 'react'

import { useMount } from '../useMount'

/**
 * Is a feature supported in the browser or not
 *
 * @param predicate - predicate to check if the feature is supported
 *
 * @see https://react-hooks-library.vercel.app/core/useIsSupported
 */
export function useIsSupported(predicate: () => boolean) {
  const [isSupported, setIsSupported] = useState(false)

  useMount(() => {
    setIsSupported(predicate())
  })

  return isSupported
}
