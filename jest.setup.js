import '@testing-library/jest-dom'
import 'jest-canvas-mock';

jest.mock('recharts', () => {
  const OriginalRecharts = jest.requireActual('recharts');

  return {
    ...OriginalRecharts,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: '1000px', height: '500px' }}>{children}</div>
    ),
  };
});


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
}
// Jest setup file or at the top of your test file
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
