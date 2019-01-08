

const _calc = require("./calc");

describe('calculator', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect((0, _calc.sum)(1, 2)).toBe(3);
  });
  test('substract 2 - 1 to equal 1', () => {
    expect((0, _calc.substract)(2, 1)).toBe(1);
    expect([1, 3, 4, 5]).toBeArray();
  });
});