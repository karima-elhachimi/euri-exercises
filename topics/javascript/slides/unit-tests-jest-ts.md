# Typescript Unit Testing - Jest
<img src="./images/testing.jpeg" width="400px" /><br>
<small>by Peter Cosemans</small>

<br>
<small>
Copyright (c) 2017 Euricom nv.
</small>

## Setup

Setup Typescript

```bash
npm install typescript -g               # global install typescript
npm init                                # create package.json
tsc --init                              # create tsconfig.json
```

Setup ts-jest helper

```bash
# install dependencies for typescript & jest
yarn add typescript ts-jest @types/jest --dev
```

----

## Config

```json
// package.json
"jest": {
    "transform": {
      ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
    },
    "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
    "moduleFileExtensions": [ "ts", "tsx", "js" ]
}
```

----

## Sample

Create the TypeScript ```sum.ts``` & test ```sum.spec.ts```

```js
export function sum(a: number, b: number) : number {
  return a + b;
}
```

```js
import { sum } from './sum';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

