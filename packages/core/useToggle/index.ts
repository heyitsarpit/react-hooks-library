import { useCallback, useState } from 'react'

/**
 * A state toggle hook
 *
 * @param defaultValue
 * @default false
 *
 * @see https://react-hooks-library.vercel.app/core/useToggle
 */
export function useToggle(defaultValue = false) {
  const [bool, setBool] = useState(defaultValue)

  const toggle = useCallback(() => setBool((s) => !s), [])

  const setTrue = useCallback(() => setBool(true), [])

  const setFalse = useCallback(() => setBool(false), [])

  return { bool, toggle, setTrue, setFalse }
}
