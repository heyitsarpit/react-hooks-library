import { useMediaQuery } from '../useMediaQuery'

export type ColorSchemeType = 'dark' | 'light'

/**
 * Reactive prefers-color-scheme media query.
 *
 * @see https://react-hooks-library.vercel.app/core/usePreferredColorScheme
 */
export function usePreferredColorScheme() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')

  return isDark ? 'dark' : 'light'
}
