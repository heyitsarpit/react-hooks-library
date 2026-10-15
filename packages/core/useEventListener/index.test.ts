import { renderHook } from '@testing-library/react'

import { useEventListener } from '.'

test('uses the current listener and removes it on unmount', () => {
  const first = jest.fn()
  const second = jest.fn()
  const { rerender, unmount } = renderHook(
    ({ listener }) => useEventListener(window, 'click', listener),
    { initialProps: { listener: first } }
  )

  window.dispatchEvent(new MouseEvent('click'))
  expect(first).toHaveBeenCalledTimes(1)

  rerender({ listener: second })
  const event = new MouseEvent('click')
  window.dispatchEvent(event)
  expect(first).toHaveBeenCalledTimes(1)
  expect(second).toHaveBeenCalledWith(event)
  expect(second.mock.instances[0]).toBe(window)

  unmount()
  window.dispatchEvent(new MouseEvent('click'))
  expect(first).toHaveBeenCalledTimes(1)
  expect(second).toHaveBeenCalledTimes(1)
})

test('manual cleanup removes the current listener', () => {
  const first = jest.fn()
  const second = jest.fn()
  const { result, rerender } = renderHook(
    ({ listener }) => useEventListener(window, 'click', listener),
    { initialProps: { listener: first } }
  )

  rerender({ listener: second })
  result.current()
  window.dispatchEvent(new MouseEvent('click'))
  expect(first).not.toHaveBeenCalled()
  expect(second).not.toHaveBeenCalled()
})
