import { act, renderHook } from '@testing-library/react-hooks'

import { useCounter } from '.'

describe('useCounter', () => {
  test('should be defined', () => {
    expect(useCounter).toBeDefined()
  })

  test('should update the counter', () => {
    const { result } = renderHook(() => useCounter(0))

    expect(result.current.count).toBe(0)
    act(() => expect(result.current.get()).toBe(0))

    act(() => result.current.inc())
    expect(result.current.count).toBe(1)
    act(() => expect(result.current.get()).toBe(1))

    act(() => result.current.dec())
    expect(result.current.count).toBe(0)
    act(() => expect(result.current.get()).toBe(0))

    act(() => result.current.set(9))
    expect(result.current.count).toBe(9)
    act(() => expect(result.current.get()).toBe(9))

    act(() => result.current.reset(25))
    expect(result.current.count).toBe(25)
    act(() => expect(result.current.get()).toBe(25))

    act(() => result.current.reset())
    expect(result.current.count).toBe(0)
    act(() => expect(result.current.get()).toBe(0))

    act(() => result.current.reset(-100))
    expect(result.current.count).toBe(-100)
    act(() => expect(result.current.get()).toBe(-100))
  })
})
