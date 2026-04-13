import '@testing-library/jest-native/extend-expect';

// Mock console for cleaner test output
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
