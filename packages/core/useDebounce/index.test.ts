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

  test('should update the value', async () => {
    let value = 'Hello World'
    let delay = 1000
    const { result, rerender, waitForValueToChange } = renderHook(() =>
      useDebounce(value, delay)
    )

    expect(result.current).toBe('Hello World')

    value = 'Goodbye World'
    rerender()

    expect(result.current).toBe('Hello World')
    await waitForValueToChange(() => result.current, { timeout: delay + 10 })
    expect(result.current).toBe('Goodbye World')

    value = 'Hello Again'
    delay = 100
    rerender()

    expect(result.current).toBe('Goodbye World')
    await waitForValueToChange(() => result.current, { timeout: delay + 10 })
    expect(result.current).toBe('Hello Again')
  })
})
