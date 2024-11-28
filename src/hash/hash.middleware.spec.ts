import { HashMiddleware } from './hash.middleware';

describe('HashMiddleware', () => {
  it('should be defined', () => {
    expect(new HashMiddleware()).toBeDefined();
  });
});
