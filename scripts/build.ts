// - update imports
// - clean
// - build rollup
// - update meta files
import { execSync as exec } from 'child_process'
import consola from 'consola'
import fs from 'fs/promises'
import { join, resolve } from 'path'

import { findFunctions } from './utils/findFunctions'

const rootDir = resolve(__dirname, '..')
const packagesDir = resolve(rootDir, 'packages')

async function buildImports() {
  const packages = findFunctions(packagesDir)

  for (const pkg of packages) {
    const functions = findFunctions(join(packagesDir, pkg)).sort()
    const contents: string[] = [
      `// This file is auto generated. Do not edit manually.\n\n`
    ]

    for (const funcName of functions) {
      contents.push(`export * from './${funcName}'\n`)
    }

    await fs.writeFile(`${join(packagesDir, pkg)}/index.ts`, contents, 'utf-8')
  }
}

async function build() {
  consola.info('Running build')

  consola.info('Cleaning dist folders')
  exec('npm run clean', { stdio: 'inherit' })

  consola.info('Building imports')
  await buildImports()

  consola.info('Running rollup')
  exec('npm run build:rollup', { stdio: 'inherit' })
}

build()
