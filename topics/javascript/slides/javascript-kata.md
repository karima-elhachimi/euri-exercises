---
title: Javascript TDD Kata's
transition: 'fade'
separator: ^---$
verticalSeparator: ^<!--vertical-->$
---

# Roman Numerals

📖 The Romans were a clever bunch. They conquered most of Europe and ruled it for hundreds of years. They invented concrete and straight roads and even bikinis.

<!--vertical-->

One thing they never discovered though was the number zero. This made writing and dating extensive histories of their exploits slightly more challenging, but the system of numbers they came up with is still in use today. For example the BBC uses Roman numerals to date their programmes.

<!--vertical-->

The Romans wrote numbers using letters : I, V, X, L, C, D, M. (notice these letters have lots of straight lines and are hence easy to hack into stone tablets)

- 1, 2 and 3 become I, II and III respectively.
- 5 and 10 become V and X respectively.
- 6 become VI, as symbols are additive.
- 4 becomes IV, as symbols are used subtractively (in this case subtracting 1 from 5) to avoid repeating a symbol more than three times in a row. By the same rule 40 becomes XL

<!--vertical-->

| Symbol | Value |
| ------ | ----- |
| I      | 1     |
| V      | 5     |
| X      | 10    |
| L      | 50    |
| C      | 100   |
| D      | 500   |
| M      | 1000  |

<!--vertical-->

## Setup

- Start from the js-node-jest starter
- Create a file called roman-numeral.js under the src folder with following content

```javascript
export function arabicToRoman(arabic) {}

export function romanToArabic(roman) {}
```

<!--vertical-->

## Before you start

- Try not to read ahead.
- Do one task at a time. The trick is to learn to work incrementally.
- Make sure you only test for correct inputs. there is no need to test for invalid inputs for this kata

<!--vertical-->

## Part I

Implement the arabicToRoman function

- 1 => I
- 3 => III
- 5 => V
- 4 => IV
- 6 => VI
- ...

<!--vertical-->

## Part II

Implement the romanToArabic function

- I => 1
- III => 3
- V => 5
- IV => 4
- VI => 6
- ...

---

# Greeter

💪 Try not to read ahead. Do one task at a time. The trick is to learn to work incrementally.

<small>This kata demonstrates the problems of static scoped functions and objects.</small>

🧠 All tests should always pass, regardless of environment conditions.

<!--vertical-->

## Greeter

Write a Greeter class with greet function that receives a name as input and outputs `Hello <name>`.

1. greet trims the input
2. greet capitalizes the first letter of the name
3. greet returns Good morning `<name>` when the time is 06:00-12:00
4. greet returns Good evening `<name>` when the time is 18:00-22:00
5. greet returns Good night `<name>` when the time is 22:00-06:00

---

# The bowling game

[http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata](http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata)