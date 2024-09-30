
import type { JestConfigWithTsJest } from 'ts-jest'
const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx)'],
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
  collectCoverage: true,
  coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
  clearMocks: true,
  resetMocks: true,
};
export default config;
