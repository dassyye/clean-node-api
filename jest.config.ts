import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
}

export default config
