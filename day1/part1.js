const fs = require("fs");

const testCase = fs.readFileSync("./data.txt", "utf-8");

const calibrateDigits = (string) => {
  const numbersArray = [];

  let iterator;

  for (let i = 0; i < string.length; i++) {
    iterator = parseInt(string[i]);

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
