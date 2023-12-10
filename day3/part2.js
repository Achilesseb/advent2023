const fs = require("fs");
const { mapNumbersPositions, mapSymbolsPositions } = require("./helpers");

const testData = fs.readFileSync("./data.txt", "utf8");

const testDataRows = testData.split("\n");

const checkPartsPart2 = (dataArray) => {
  const parts = [];
  let mappedNumbersToCheck = [];
  let mappedSymbolsToCheck = [];

  for (let i = 0; i < dataArray.length; i++) {
    const row = dataArray[i].match(/[^0-9]|[0-9]/g);
    mappedNumbersToCheck.push(mapNumbersPositions(row, i));

    mappedSymbolsToCheck.push(mapSymbolsPositions(row, i));
  }

  mappedNumbersToCheck = mappedNumbersToCheck.flat();
  mappedSymbolsToCheck = mappedSymbolsToCheck
    .flat()
    .filter((symbols) => symbols.symbol === "*");

  mappedSymbolsToCheck.forEach((symbol) => {
    const gearsPairs = new Set();
    mappedNumbersToCheck.forEach((number) => {
      if (
        symbol.row === number.row &&
        (symbol.index === number.startIndex - 1 ||
          symbol.index === number.endIndex + 1)
      ) {
        gearsPairs.add(number.value);
      } else if (
        symbol.row === number.row + 1 &&
        symbol.index >= number.startIndex - 1 &&
        symbol.index <= number.endIndex + 1
      ) {
        gearsPairs.add(number.value);
      } else if (
        symbol.row === number.row - 1 &&
        symbol.index >= number.startIndex - 1 &&
        symbol.index <= number.endIndex + 1
      ) {
        gearsPairs.add(number.value);
      }
    });
    if ([...gearsPairs].length > 1)
      parts.push([...gearsPairs].reduce((acc, cur) => acc * parseInt(cur), 1));
  });

  console.log(
    "Part 2: ",
    parts.reduce((acc, cur) => acc + parseInt(cur), 0)
  );
};

checkPartsPart2(testDataRows);
