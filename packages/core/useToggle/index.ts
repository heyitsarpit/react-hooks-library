import { useState } from 'react'

/**
 * A state toggle hook
 *
 * @param defaultValue
 * @default false
 *
 * @see https://react-hooks-library.vercel.app/core/useToggle
 */
export function useToggle(defaultValue: boolean = false) {
  const [bool, setBool] = useState(defaultValue)

  const toggle = () => setBool((s) => !s)
  const setTrue = () => setBool(true)
  const setFalse = () => setBool(false)

  return { bool, toggle, setTrue, setFalse }
}
