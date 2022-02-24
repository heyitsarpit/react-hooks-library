import { isFunction } from '@react-hooks-library/shared'
import { useCallback, useRef, useState } from 'react'

type UseStateHistoryOptions = {
  /**
   * Max number of history states to be stores
   *
   * @default 10
   */
  maxHistory?: number
}

/**
 *
 * useState with built in undo and redo history control
 *
 * @param defaultValue
 * @param options
 * @returns
 */
export function useStateHistory<T>(
  defaultValue: T | (() => T),
  options: UseStateHistoryOptions = {}
) {
  const { maxHistory = 10 } = options
  const [state, setState] = useState(defaultValue)

  const lastSaved = useRef<T>(
    isFunction(defaultValue) ? defaultValue() : defaultValue
  )
  const rerender = useState({})[1]

  const actionHistory = useRef<T[]>([])
  const redoHistory = useRef<T[]>([])
  const redoAllowed = useRef(false)

  const push = useCallback(
    (value: T) => {
      if (actionHistory.current.length < maxHistory) {
        actionHistory.current.push(value)
      } else {
        actionHistory.current = [...actionHistory.current.slice(1), value]
        lastSaved.current = actionHistory.current[0]
      }

      redoAllowed.current = false
      setState(value)
    },
    [maxHistory]
  )

  const redo = useCallback(() => {
    if (!(redoHistory.current.length && redoAllowed.current)) return

    const lastUndoState = redoHistory.current.pop()
    lastUndoState && push(lastUndoState)
    redoAllowed.current = true
  }, [push])

  const undo = useCallback(() => {
    if (actionHistory.current.length < 1) return

    const lastState = actionHistory.current.pop()
    lastState && redoHistory.current.push(lastState)

    const prev = actionHistory.current[actionHistory.current.length - 1]
    prev ? setState(prev) : setState(lastSaved.current)
    rerender({})
    redoAllowed.current = true
  }, [rerender])

  const reset = useCallback(() => {
    if (!actionHistory.current?.length) return

    setState(actionHistory.current[0])
    actionHistory.current = [actionHistory.current[0]]
  }, [])

  return {
    state,
    push,
    undo,
    redo,
    reset,
    history: actionHistory.current,
    redoAllowed: redoAllowed.current
  }
}
