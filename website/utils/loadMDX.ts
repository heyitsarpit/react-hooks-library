import fg from 'fast-glob'
import fs from 'fs'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import { join } from 'path'
import rehypeAutolink from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkPrism from 'remark-prism'

import { FunctionMeta } from '../../types'

function findFunctions(dir: string, ignore: string[] = []): string[] {
  return fg.sync('*', {
    onlyDirectories: true,
    cwd: dir,
    ignore: ['**/dist', '**/node_modules', '_*', ...ignore]
  })
}

function findRootDir(base = __dirname) {
  const exists = fs.existsSync(join(base, 'rollup.config.js'))

  return exists ? base : findRootDir(join(base, '..'))
}

const ROOT_DIR = findRootDir()
const PACKAGES_DIR = join(ROOT_DIR, 'packages')

/**
 * Get meta data of all posts
 */
export async function getAllFunctionsMeta() {
  const packages = findFunctions(PACKAGES_DIR)

  const allFunctions: FunctionMeta[] = []

  for (const pkg of packages) {
    const functions = findFunctions(join(PACKAGES_DIR, pkg)).sort()

    for (const name of functions) {
      const post = fs.readFileSync(
        join(PACKAGES_DIR, pkg, name, 'docs.mdx'),
        'utf-8'
      )
      const meta = matter(post).data
      allFunctions.push({
        ...meta,
        pkg,
        name
      } as FunctionMeta)
    }
  }

  return allFunctions
}

/**
 *
 * @param source source mdx file path
 * @param cwd source mdx file path
 * @returns bundled react component
 */
export async function loadMdx(source: string, cwd?: string) {
  const { code, frontmatter } = await bundleMDX(source, {
    cwd,
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGfm,
        remarkPrism
      ]
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeAutolink
      ]
      return options
    }
  })

  const meta = { ...frontmatter } as FunctionMeta
  return { meta, code }
}

/**
 * Get a single post content by slug
 *
 * @param pkg package name
 * @param name function name
 * @returns bundled react component and meta data
 */
export async function getFunction(pkg: string, name: string) {
  const folderPath = join(PACKAGES_DIR, pkg, name)
  const source = fs.readFileSync(join(folderPath, 'docs.mdx'), 'utf-8')

  const { code, meta } = await loadMdx(source, folderPath)

  const _meta = { ...meta, pkg, name } as FunctionMeta
  return { meta: _meta, code }
}
