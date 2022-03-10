import { useMediaQuery } from '../useMediaQuery'
export * from './breakpoints'
import { _window } from '../_ssr.config'

function match(query: string): boolean {
  if (!_window) return false

  return _window.matchMedia(query).matches
}

/**
 * Reactive hooks and utilities to be used with user provided breakpoints.
 *
 * @param {string} breakpoints
 * @returns functions to be used as hooks
 *
 * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
 */
export function BreakPointHooks<BreakPoints extends Record<string, number>>(
  breakpoints: BreakPoints
) {
  type BreakPointsKey = keyof BreakPoints

  return {
    /**
     * Hook that returns a boolean if screen width is greater than given breakpoint.
     *
     * @param k {string} breakpoint
     * @returns boolean
     *
     * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
     **/
    useGreater: (k: BreakPointsKey) => {
      return useMediaQuery(`(min-width: ${breakpoints[k]}px)`)
    },

    /**
     * Hook that returns a boolean if screen width is smaller than given breakpoint.
     *
     * @param k {string} breakpoint
     * @param k {string} breakpoint
     *
     * @returns boolean
     *
     * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
     **/
    useSmaller: (k: BreakPointsKey) => {
      return useMediaQuery(`(max-width: ${breakpoints[k]}px)`)
    },

    /**
     * Hook that returns a boolean if screen width is between two given breakpoint.
     *
     * @param a {string} breakpoint
     * @param b {string} breakpoint
     *
     * @returns boolean
     *
     * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
     **/
    useBetween: (a: BreakPointsKey, b: BreakPointsKey) => {
      return useMediaQuery(
        `(min-width: ${breakpoints[a]}px) and (max-width: ${breakpoints[b]}px)`
      )
    },

    /**
     * Utility function that returns a boolean if screen width is greater than given breakpoint.
     *
     * @param k {string} breakpoint
     *
     * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
     **/
    isGreater(k: BreakPointsKey) {
      return match(`(min-width: ${breakpoints[k]}px)`)
    },

    /**
     * Utility function that returns a boolean if screen width is smaller than given breakpoint.
     *
     * @param k {string} breakpoint
     *
     * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
     **/
    isSmaller(k: BreakPointsKey) {
      return match(`(max-width: ${breakpoints[k]}px)`)
    },

    /**
     * Utility function that returns a boolean if screen width is between two given breakpoint.
     *
     * @param k {string} breakpoint
     *
     * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
     **/
    isInBetween(a: BreakPointsKey, b: BreakPointsKey) {
      return match(
        `(min-width: ${breakpoints[a]}px) and (max-width: ${breakpoints[b]}px)`
      )
    }
  }
}

export type BreakPointHooksReturn = ReturnType<typeof BreakPointHooks>
