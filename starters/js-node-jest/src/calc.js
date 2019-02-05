export function sum(a, b) {
  return a + b;
}

export async function sumAsync(a, b) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(sum(a, b)), 500);
  });
}

export function substract(a, b) {
  return a - b;
}
