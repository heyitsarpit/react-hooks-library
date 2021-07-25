// - update imports
// - clean
// - build rollup
// - update meta files
import { execSync as exec } from 'child_process'
import consola from 'consola'
import { join, resolve } from 'path'

const rootDir = resolve(__dirname, '..')
const packagesDir = resolve(__dirname, '../packages')

// function createPackageMetaFiles() {}

function build() {
  consola.info('Running build')

  consola.info('Cleaning dist folders')
  exec('npm run clean', { stdio: 'inherit' })

  consola.info('Running rollup')
  exec('npm run build:rollup', { stdio: 'inherit' })
}

// build()
