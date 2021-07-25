import { RollupOptions } from 'rollup'
import dts from 'rollup-plugin-dts'
import typescript from 'rollup-plugin-typescript2'

export const config: RollupOptions[] = [
  {
    input: 'packages/core/index.ts',
    output: [
      {
        file: 'packages/core/dist/index.cjs.js',
        format: 'cjs'
      },
      {
        file: 'packages/core/dist/index.esm.js',
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
    input: 'packages/core/index.ts',
    output: [
      {
        file: 'packages/core/dist/index.d.ts',
        format: 'esm'
      }
    ],
    plugins: [dts()]
  }
]

export default config
