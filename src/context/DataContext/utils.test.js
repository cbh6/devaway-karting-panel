import { timeStringToMS } from './utils';

describe('DataContext utils', () => {
  test('timeStringToMS function', () => {
    expect(timeStringToMS()).toBeUndefined();
    expect(timeStringToMS('1:54:32.554')).toBe(6872554);
  });
});
