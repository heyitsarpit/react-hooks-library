import { isClient } from '@react-hooks-library/shared'
import { useEffect, useState } from 'react'

/**
 * Reactive media query hook that returns the truthy value of the media query.
 *
 * @param {string} query
 * @returns {boolean} boolean value of the query
 *
 * @see https://react-hooks-library.vercel.app/core/useMediaQuery
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() =>
    isClient ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
