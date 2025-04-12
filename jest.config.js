import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
  })
  
  const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    testMatch: ['**/?(*.)+(test).[jt]s?(x)'], 
  }
  
  export default createJestConfig(customJestConfig)