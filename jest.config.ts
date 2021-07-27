import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  roots: ['<rootDir>/packages', '<rootDir>/website'],
  testMatch: ['**/?(*.)+(test).+(ts|tsx|js|jsx)'],
  // TODO: Move to esbuild
  transform: { '^.+\\.(ts|tsx|jsx)$': 'ts-jest' },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  modulePathIgnorePatterns: ['/dist/']
}

export default config
