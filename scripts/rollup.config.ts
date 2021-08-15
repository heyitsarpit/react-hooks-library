import fg from 'fast-glob'
import { join } from 'path'
import { RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import typescript from 'rollup-plugin-typescript2'

const packages = fg.sync('*', {
  cwd: join('.', 'packages'),
  onlyDirectories: true
})

const config = packages
  .map((pkg): RollupOptions[] => [
    {
      input: `packages/${pkg}/index.ts`,
      output: [
        {
          file: `packages/${pkg}/dist/index.cjs.js`,
          format: 'cjs'
        },
        {
          file: `packages/${pkg}/dist/index.esm.js`,
          format: 'esm'
        }
      ],
      plugins: [
        typescript({
          tsconfigOverride: {
            compilerOptions: {
              declaration: false
            }
          }
        })
      ],
      external: ['react']
    },
    {
      input: `packages/${pkg}/index.ts`,
      output: [
        {
          file: `packages/${pkg}/dist/index.d.ts`,
          format: 'esm'
        }
      ],
      plugins: [dts()]
    }
  ])
  .flat()

export default config
