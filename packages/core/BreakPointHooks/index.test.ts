import { renderHook } from '@testing-library/react'
import fs from 'fs/promises'
import { join } from 'path'

import { testDocs } from '../../../scripts/utils/testUtils'
import { BreakPointHooks } from '.'

const FunctionName = BreakPointHooks.name

function mockMatchMedia() {
  const matchMedia = jest.fn((query: string) => ({
    matches: query.includes('48rem'),
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: matchMedia
  })

  return matchMedia
}

describe(FunctionName, () => {
  test('should be defined', () => {
    expect(BreakPointHooks).toBeDefined()
  })

  test('should have docs with appropriate meta data', async () => {
    const source = await fs.readFile(join(__dirname, '/docs.mdx'), 'utf-8')
    testDocs(FunctionName, source)
  })

  test('should format numeric breakpoints as px', () => {
    const matchMedia = mockMatchMedia()
    const { isGreater, isSmaller, isInBetween } = BreakPointHooks({
      sm: 640,
      lg: 1024
    })

    isGreater('sm')
    isSmaller('lg')
    isInBetween('sm', 'lg')

    expect(matchMedia).toHaveBeenNthCalledWith(1, '(min-width: 640px)')
    expect(matchMedia).toHaveBeenNthCalledWith(2, '(max-width: 1024px)')
    expect(matchMedia).toHaveBeenNthCalledWith(
      3,
      '(min-width: 640px) and (max-width: 1024px)'
    )
  })

  test('should pass string breakpoints through unchanged', () => {
    const matchMedia = mockMatchMedia()
    const { isGreater, isSmaller, isInBetween, useGreater } = BreakPointHooks({
      md: '48rem',
      xl: '80rem'
    })

    expect(isGreater('md')).toBe(true)
    isSmaller('xl')
    isInBetween('md', 'xl')
    renderHook(() => useGreater('md'))

    expect(matchMedia).toHaveBeenNthCalledWith(1, '(min-width: 48rem)')
    expect(matchMedia).toHaveBeenNthCalledWith(2, '(max-width: 80rem)')
    expect(matchMedia).toHaveBeenNthCalledWith(
      3,
      '(min-width: 48rem) and (max-width: 80rem)'
    )
    expect(matchMedia).toHaveBeenCalledWith('(min-width: 48rem)')
  })
})
