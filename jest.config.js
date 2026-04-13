module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'mocks/**/*.ts',
    'validators/**/*.ts',
    'hooks/**/*.ts',
    'utils/**/*.ts',
    '!**/*.d.ts',
  ],
  testMatch: [
    '**/__tests__/**/*.test.ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        module: 'commonjs',
        moduleResolution: 'node',
        target: 'ES2020',
        jsx: 'react-jsx',
        esModuleInterop: true,
        skipLibCheck: true,
        strict: true,
        resolveJsonModule: true,
        allowJs: true,
        declaration: false,
      },
      isolatedModules: true,
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
