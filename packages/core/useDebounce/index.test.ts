import { act, renderHook } from '@testing-library/react'
import fs from 'fs/promises'
import { join } from 'path'

import { testDocs } from '../../../scripts/utils/testUtils'
import { useDebounce } from '.'

const FunctionName = useDebounce.name

describe(FunctionName, () => {
  test('should be defined', () => {
    expect(useDebounce).toBeDefined()
  })

  test('should have docs with appropriate meta data', async () => {
    const source = await fs.readFile(join(__dirname, '/docs.mdx'), 'utf-8')
    testDocs(FunctionName, source)
  })

  test('should update the value', async () => {
    jest.useFakeTimers()

    try {
      let value = 'Hello World'
      let delay = 1000
      const { result, rerender } = renderHook(() => useDebounce(value, delay))

      expect(result.current).toBe('Hello World')

      value = 'Goodbye World'
      rerender()

      expect(result.current).toBe('Hello World')
      act(() => {
        jest.advanceTimersByTime(delay)
      })
      expect(result.current).toBe('Goodbye World')

      value = 'Hello Again'
      delay = 100
      rerender()

      expect(result.current).toBe('Goodbye World')
      act(() => {
        jest.advanceTimersByTime(delay)
      })
      expect(result.current).toBe('Hello Again')
    } finally {
      jest.useRealTimers()
    }
  })
})
