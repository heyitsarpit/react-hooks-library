import { useMediaQuery } from '../useMediaQuery'
export * from './breakpoints'
import { _window } from '../_ssr.config'

type BreakPointValue = number | string

function match(query: string): boolean {
  if (!_window) return false

  return _window.matchMedia(query).matches
}

function toWidth(value: BreakPointValue): string {
  return typeof value === 'number' ? `${value}px` : value
}

/**
 * Reactive hooks and utilities to be used with user provided breakpoints.
 *
 * @param {string} breakpoints
 * @returns functions to be used as hooks
 *
 * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
 */
export function BreakPointHooks<
  BreakPoints extends Record<string, BreakPointValue>
>(breakpoints: BreakPoints) {
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
      return useMediaQuery(`(min-width: ${toWidth(breakpoints[k])})`)
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
      return useMediaQuery(`(max-width: ${toWidth(breakpoints[k])})`)
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
        `(min-width: ${toWidth(breakpoints[a])}) and (max-width: ${toWidth(
          breakpoints[b]
        )})`
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
      return match(`(min-width: ${toWidth(breakpoints[k])})`)
    },

    /**
     * Utility function that returns a boolean if screen width is smaller than given breakpoint.
     *
     * @param k {string} breakpoint
     *
     * @see https://react-hooks-library.vercel.app/core/BreakPointHooks
     **/
    isSmaller(k: BreakPointsKey) {
      return match(`(max-width: ${toWidth(breakpoints[k])})`)
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
        `(min-width: ${toWidth(breakpoints[a])}) and (max-width: ${toWidth(
          breakpoints[b]
        )})`
      )
    }
  }
}

export type BreakPointHooksReturn = ReturnType<typeof BreakPointHooks>
