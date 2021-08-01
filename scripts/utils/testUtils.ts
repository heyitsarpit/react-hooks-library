import matter from 'gray-matter'

import type { FunctionMeta } from '../../types'

export function testDocs(name: string, source: string) {
  const meta = matter(source).data as FunctionMeta

  expect(meta).toBeDefined()

  expect(meta).toHaveProperty('name')
  expect(meta).toHaveProperty('description')
  expect(meta).toHaveProperty('category')

  expect(meta.name).toBe(name)
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
