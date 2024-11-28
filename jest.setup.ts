import '@testing-library/jest-dom'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}

global.localStorage = {
  ...localStorageMock,
  length: 0,
  key: jest.fn(),
  removeItem: jest.fn()
} as Storage

// Jest setup file or at the top of your test file
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
