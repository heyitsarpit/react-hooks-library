import { renderHook } from '@testing-library/react-hooks'
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

  // TODO: Add more test cases
  test('should update the counter', () => {
    const value = 'Hello World'
    const delay = 1000
    const { result } = renderHook(() => useDebounce(value, delay))

    expect(result.current).toBe('Hello World')
  })
})
