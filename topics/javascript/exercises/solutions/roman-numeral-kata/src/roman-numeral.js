const romanNumeralMap = new Map()
  .set('M', 1000)
  .set('D', 500)
  .set('C', 100)
  .set('L', 50)
  .set('X', 10)
  .set('V', 5)
  .set('I', 1);

const replacementMap = new Map()
  .set('DCCCC', 'CM')
  .set('LXXXX', 'XC')
  .set('XXXX', 'XL')
  .set('VIIII', 'IX')
  .set('IIII', 'IV');

function normalize(roman) {
  let normalized = roman;

  replacementMap.forEach((value, key) => {
    normalized = normalized.replace(key, value);
  });

  return normalized;
}

function denormalize(roman) {
  let denormalized = roman;

  replacementMap.forEach((value, key) => {
    denormalized = denormalized.replace(value, key);
  });

  return denormalized;
}

export function arabicToRoman(arabic) {
  let roman = '';
  let rest = arabic;

  // eslint-disable-next-line no-restricted-syntax
  for (const [romanNumeral, arabicNumeral] of romanNumeralMap.entries()) {
    if (rest >= arabicNumeral) {
      const quotient = Math.trunc(rest / arabicNumeral);

      roman += romanNumeral.repeat(quotient);
      rest -= arabicNumeral * quotient;
    }

    if (rest === 0) break;
  }

  return normalize(roman);
}

export function romanToArabic(roman) {
  const denormalizedRoman = denormalize(roman);

  return [...denormalizedRoman]
    .map(romanNumeral => romanNumeralMap.get(romanNumeral))
    .reduce((a, b) => a + b, 0);
}
