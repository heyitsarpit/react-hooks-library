import { execSync } from 'child_process'
import consola from 'consola'
import { join, resolve } from 'path'

import { version } from '../package.json'
import { findFunctions } from './utils/findFunctions'

execSync('yarn build:full', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta')) command += ' --tag beta'

const rootDir = resolve(__dirname, '..')
const packagesDir = resolve(rootDir, 'packages')
const packages = findFunctions(packagesDir)

for (const pkg of packages) {
  execSync(command, {
    stdio: 'inherit',
    cwd: join('packages', pkg, 'dist')
  })

  consola.success(`Published @react-hooks-library/${pkg}`)
}
