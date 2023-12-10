const fs = require("fs");
const { mapNumbersPositions, mapSymbolsPositions } = require("./helpers");

const testData = fs.readFileSync("./data.txt", "utf8");

const testDataRows = testData.split("\n");

const checkPartsPart1 = (dataArray) => {
  const parts = [];
  let mappedNumbersToCheck = [];
  let mappedSymbolsToCheck = [];

  for (let i = 0; i < dataArray.length; i++) {
    const row = dataArray[i].match(/[^0-9]|[0-9]/g);
    mappedNumbersToCheck.push(mapNumbersPositions(row, i));

    mappedSymbolsToCheck.push(mapSymbolsPositions(row, i));
  }

  mappedNumbersToCheck = mappedNumbersToCheck.flat();
  mappedSymbolsToCheck = mappedSymbolsToCheck.flat();

  mappedNumbersToCheck.forEach((number) => {
    if (
      mappedSymbolsToCheck.some(
        (symbols) =>
          symbols.row === number.row &&
          (symbols.index === number.endIndex + 1 ||
            symbols.index === number.startIndex - 1)
      )
    ) {
      parts.push(parseInt(number.value));
    } else if (
      mappedSymbolsToCheck.some(
        (symbols) =>
          symbols.row === number.row + 1 &&
          symbols.index >= number.startIndex - 1 &&
          symbols.index <= number.endIndex + 1
      )
    ) {
      parts.push(parseInt(number.value));
    } else if (
      mappedSymbolsToCheck.some(
        (symbols) =>
          symbols.row === number.row - 1 &&
          symbols.index >= number.startIndex - 1 &&
          symbols.index <= number.endIndex + 1
      )
    ) {
      parts.push(parseInt(number.value));
    }
  });

  console.log(
    "Part 1: ",
    parts.reduce((acc, cur) => acc + cur, 0)
  );
};

checkPartsPart1(testDataRows);
