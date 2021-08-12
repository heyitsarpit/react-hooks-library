import { renderHook } from '@testing-library/react-hooks'
import fs from 'fs/promises'
import { join } from 'path'

import { testDocs } from '../../../scripts/utils/testUtils'
import { usePrevious } from '.'

const FunctionName = usePrevious.name

describe(FunctionName, () => {
  test('should be defined', () => {
    expect(usePrevious).toBeDefined()
  })

  test('should have docs with appropriate meta data', async () => {
    const source = await fs.readFile(join(__dirname, '/docs.mdx'), 'utf-8')
    testDocs(FunctionName, source)
  })

  test('should update the return previous value', () => {
    let count = 1
    const { result, rerender } = renderHook(() => usePrevious(count))

    expect(result.current).toBe(undefined)

    rerender()
    expect(result.current).toBe(1)

    count = 100
    rerender()
    expect(result.current).toBe(1)

    count = -1000
    rerender()
    expect(result.current).toBe(100)

    rerender()
    expect(result.current).toBe(-1000)
  })
})
