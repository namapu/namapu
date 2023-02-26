// example.test.js
import { expect, test } from 'vitest';

test('Math.sqrt()', () => {
  expect(3 * 3).toBe(9);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
});
