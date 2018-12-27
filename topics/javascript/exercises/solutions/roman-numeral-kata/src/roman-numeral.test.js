import { arabicToRoman, romanToArabic } from './roman-numeral';

describe('Converting from arabic to a roman numeral', () => {
  it('converts 1 to I', () => {
    expect(arabicToRoman(1)).toBe('I');
  });

  it('converts 3 to III', () => {
    expect(arabicToRoman(3)).toBe('III');
  });

  it('converts 5 to V', () => {
    expect(arabicToRoman(5)).toBe('V');
  });

  it('converts 6 to VI', () => {
    expect(arabicToRoman(6)).toBe('VI');
  });

  it('converts 4 to IV', () => {
    expect(arabicToRoman(4)).toBe('IV');
  });

  it('converts 10 to X', () => {
    expect(arabicToRoman(10)).toBe('X');
  });

  it('converts 9 to IX', () => {
    expect(arabicToRoman(9)).toBe('IX');
  });

  it('converts 35 to XXXV', () => {
    expect(arabicToRoman(35)).toBe('XXXV');
  });

  it('converts 50 to L', () => {
    expect(arabicToRoman(50)).toBe('L');
  });

  it('converts 40 to XL', () => {
    expect(arabicToRoman(40)).toBe('XL');
  });

  it('converts 100 to C', () => {
    expect(arabicToRoman(100)).toBe('C');
  });

  it('converts 90 to XC', () => {
    expect(arabicToRoman(90)).toBe('XC');
  });

  it('converts 399 to CCCXCIX', () => {
    expect(arabicToRoman(399)).toBe('CCCXCIX');
  });

  it('converts 500 to D', () => {
    expect(arabicToRoman(500)).toBe('D');
  });

  it('converts 899 to DCCCXCIX', () => {
    expect(arabicToRoman(899)).toBe('DCCCXCIX');
  });

  it('converts 1000 to M', () => {
    expect(arabicToRoman(1000)).toBe('M');
  });

  it('converts 3999 to MMMCMXCIX', () => {
    expect(arabicToRoman(3999)).toBe('MMMCMXCIX');
  });
});

describe('Converting from roman to an arabic numeral', () => {
  it('converts I to 1', () => {
    expect(romanToArabic('I')).toBe(1);
  });

  it('converts III to 3', () => {
    expect(romanToArabic('III')).toBe(3);
  });

  it('converts V to 5', () => {
    expect(romanToArabic('V')).toBe(5);
  });

  it('converts VI to 6', () => {
    expect(romanToArabic('VI')).toBe(6);
  });

  it('converts IV to 4', () => {
    expect(romanToArabic('IV')).toBe(4);
  });

  it('converts X to 10', () => {
    expect(romanToArabic('X')).toBe(10);
  });

  it('converts IX to 9', () => {
    expect(romanToArabic('IX')).toBe(9);
  });

  it('converts XXXV to 35', () => {
    expect(romanToArabic('XXXV')).toBe(35);
  });

  it('converts L to 50', () => {
    expect(romanToArabic('L')).toBe(50);
  });

  it('converts XL to 40', () => {
    expect(romanToArabic('XL')).toBe(40);
  });

  it('converts C to 100', () => {
    expect(romanToArabic('C')).toBe(100);
  });

  it('converts XC to 90', () => {
    expect(romanToArabic('XC')).toBe(90);
  });

  it('converts CCCXCIX to 399', () => {
    expect(romanToArabic('CCCXCIX')).toBe(399);
  });

  it('converts D to 500', () => {
    expect(romanToArabic('D')).toBe(500);
  });

  it('converts DCCCXCIX to 899', () => {
    expect(romanToArabic('DCCCXCIX')).toBe(899);
  });

  it('converts M to 1000', () => {
    expect(romanToArabic('M')).toBe(1000);
  });

  it('converts MMMCMXCIX to 3999', () => {
    expect(romanToArabic('MMMCMXCIX')).toBe(3999);
  });
});
