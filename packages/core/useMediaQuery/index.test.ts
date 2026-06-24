import { act, renderHook } from '@testing-library/react'
import fs from 'fs/promises'
import { join } from 'path'

import { testDocs } from '../../../scripts/utils/testUtils'
import { useMediaQuery } from '.'

const FunctionName = useMediaQuery.name

function mockMatchMedia(matches: boolean) {
  let listener: ((event: MediaQueryListEvent) => void) | undefined

  const mediaQueryList = {
    matches,
    media: '',
    onchange: null,
    addListener: jest.fn((handler) => {
      listener = handler
    }),
    removeListener: jest.fn(),
    addEventListener: jest.fn((_, handler) => {
      listener = handler
    }),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn((query) => ({
      ...mediaQueryList,
      media: query
    }))
  })

  return {
    change(nextMatches: boolean) {
      act(() => {
        listener?.({ matches: nextMatches } as MediaQueryListEvent)
      })
    }
  }
}

describe(FunctionName, () => {
  test('should be defined', () => {
    expect(useMediaQuery).toBeDefined()
  })

  test('should have docs with appropriate meta data', async () => {
    const source = await fs.readFile(join(__dirname, '/docs.mdx'), 'utf-8')
    testDocs(FunctionName, source)
  })

  test('should use matchMedia result as the initial value', () => {
    mockMatchMedia(true)

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))

    expect(result.current).toBe(true)
    expect(window.matchMedia).toHaveBeenCalledWith('(min-width: 1024px)')
  })

  test('should update when the media query changes', () => {
    const mediaQuery = mockMatchMedia(false)

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))

    expect(result.current).toBe(false)

    mediaQuery.change(true)

    expect(result.current).toBe(true)
  })
})
