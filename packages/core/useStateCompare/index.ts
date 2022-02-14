import { Dispatch, SetStateAction, useCallback, useState } from 'react'

export type UseStateCompare<T> = {
  initialValue: T | (() => T)
  compare: (oldValue: T, newValue: T) => T
}

/**
 * useState hook with custom compare function to avoid re-rendering
 * when state is the same, compares with previous state
 *
 *
 * Note: create a custom compare function, outside of the hook to keep
 * a stable reference, otherwise it will be recreated on every render
 *
 * @see https://react-hooks-library.vercel.app/core/useStateCompare
 */
export function useStateCompare<T>({
  initialValue,
  compare
}: UseStateCompare<T>): [T, Dispatch<SetStateAction<T>>] {
  const [state, _setState] = useState(initialValue)

  const setState: Dispatch<SetStateAction<T>> = useCallback(
    (value: T | ((prevState: T) => T)) => {
      typeof value === 'function'
        ? _setState(value)
        : _setState((oldValue) => compare(oldValue, value))
    },
    [compare]
  )

  return [state, setState]
}
