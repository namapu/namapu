// example.test.js
import { expect, test } from 'vitest';

test('Math.sqrt()', () => {
  expect(Math.sqrt(16)).toBe(4);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
});

