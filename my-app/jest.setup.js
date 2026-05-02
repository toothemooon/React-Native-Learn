// Mock expo's global installation for Jest
jest.mock('expo', () => {
  return {};
}, { virtual: true });
