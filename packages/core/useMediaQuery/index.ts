import { isClient } from '@react-hooks-library/shared'
import { useEffect, useState } from 'react'

type LegacyMediaQueryList = MediaQueryList & {
  addListener: (listener: (event: MediaQueryListEvent) => void) => void
  removeListener: (listener: (event: MediaQueryListEvent) => void) => void
}

function getMatches(query: string): boolean {
  if (!isClient || !window.matchMedia) return false

  return window.matchMedia(query).matches
}

/**
 * Reactive media query hook that returns the truthy value of the media query.
 *
 * @param {string} query
 * @returns {boolean} boolean value of the query
 *
 * @see https://react-hooks-library.vercel.app/core/useMediaQuery
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => getMatches(query))

  useEffect(() => {
    if (!isClient || !window.matchMedia) return

    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    setMatches(mediaQuery.matches)

    // Add event listener for old safari browsers
    'addEventListener' in mediaQuery
      ? mediaQuery.addEventListener('change', handler)
      : (mediaQuery as LegacyMediaQueryList).addListener(handler)

    return () => {
      'addEventListener' in mediaQuery
        ? mediaQuery.removeEventListener('change', handler)
        : (mediaQuery as LegacyMediaQueryList).removeListener(handler)
    }
  }, [query])

  return matches
}
