/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)', '!**/node_modules/**'],

  clearMocks: true,
  restoreMocks: true,
}
