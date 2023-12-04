const fs = require("fs");

const testCase = fs.readFileSync("./data.txt", "utf-8");
const digitsToString = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const replaceStringDigits = (toBeReplacedString) => {
  let replacementString = toBeReplacedString;
  for (let [key, value] of Object.entries(digitsToString)) {
    if (!toBeReplacedString.includes(key)) continue;

    const leftRest = toBeReplacedString.slice(
      0,
      toBeReplacedString.indexOf(key) + 1
    );
    const rightRest = toBeReplacedString.slice(
      toBeReplacedString.indexOf(key) + key.length - 1
    );

    replacementString = leftRest + value + rightRest;
    return replaceStringDigits(replacementString.toString());
  }
  return replacementString;
};

const calibrateDigits = (string) => {
  const numbersArray = [];

  let iterator;

  const newString = replaceStringDigits(string);

  for (let i = 0; i < newString.length; i++) {
    iterator = parseInt(newString[i]);

    if (isNaN(iterator)) {
      continue;
    }

    if (typeof iterator === "number") {
      numbersArray.push(iterator);
    }
  }
  const finalResult = `${numbersArray[0] ?? 0}${
    numbersArray[numbersArray.length - 1] ?? ""
  }`;
  return parseInt(finalResult);
};

const calibrateDigitsFinalSum = (stringArray) => {
  let totalDigitsSum = 0;
  stringArray.forEach((string) => (totalDigitsSum += calibrateDigits(string)));
  return totalDigitsSum;
};

console.log(calibrateDigitsFinalSum(testCase.split("\n")));
