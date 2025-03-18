import "@testing-library/jest-dom";

global.localStorage = {
    getItem: vi.fn(() => "mocked-token"), 
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };