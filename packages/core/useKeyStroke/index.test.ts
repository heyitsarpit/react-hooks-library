import { renderHook } from '@testing-library/react-hooks'
import fs from 'fs/promises'
import { join } from 'path'

import { testDocs } from '../../../scripts/utils/testUtils'
import { useKeyDown, useKeyStroke, useKeyUp } from '.'

const FunctionName = useKeyStroke.name

function dispatchKeyboardEvent(eventName: string, init: KeyboardEventInit) {
  window.dispatchEvent(new KeyboardEvent(eventName, init))
}

describe(FunctionName, () => {
  test('should be defined', () => {
    expect(useKeyStroke).toBeDefined()
  })

  test('should have docs with appropriate meta data', async () => {
    const source = await fs.readFile(join(__dirname, '/docs.mdx'), 'utf-8')
    testDocs(FunctionName, source)
  })

  test('should match string keys exactly', () => {
    const handler = jest.fn()

    renderHook(() => useKeyDown('Enter', handler))

    dispatchKeyboardEvent('keydown', { key: 'r' })
    dispatchKeyboardEvent('keydown', { key: 'Enter' })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should match keys from an array', () => {
    const handler = jest.fn()

    renderHook(() => useKeyDown(['w', 'W', 'ArrowUp'], handler))

    dispatchKeyboardEvent('keydown', { key: 's' })
    dispatchKeyboardEvent('keydown', { key: 'ArrowUp' })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should match event code when code option is true', () => {
    const handler = jest.fn()

    renderHook(() => useKeyDown('Digit1', handler, { code: true }))

    dispatchKeyboardEvent('keydown', { key: '1', code: 'KeyA' })
    dispatchKeyboardEvent('keydown', { key: '1', code: 'Digit1' })

    expect(handler).toHaveBeenCalledTimes(1)
  })

  test('should listen to the configured event name', () => {
    const handler = jest.fn()

    renderHook(() => useKeyUp('Escape', handler))

    dispatchKeyboardEvent('keydown', { key: 'Escape' })
    dispatchKeyboardEvent('keyup', { key: 'Escape' })

    expect(handler).toHaveBeenCalledTimes(1)
  })
})
