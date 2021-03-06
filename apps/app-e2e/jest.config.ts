/* eslint-disable */
export default {
  displayName: 'api',
  preset: 'jest-puppeteer',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/api',
  globalSetup: '<rootDir>/tests/globalSetup.ts'
};
