exports.mapNumbersPositions = (row, rowIndex) => {
  const numbersToCheck = new Set();
  const completedRow = [...row, "."];

  let number = "";
  for (let z = 0; z < completedRow.length; z++) {
    if (completedRow[z].match(/[0-9]/)) {
      number += completedRow[z];
    } else {
      if (number) {
        numbersToCheck.add({
          value: number,
          startIndex: z - number.length,
          endIndex: z - 1,
          row: rowIndex,
        });
      }
      number = "";
      continue;
    }
  }
  return [...numbersToCheck];
};

exports.mapSymbolsPositions = (row, rowIndex) => {
  const symbolsToCheck = new Set();
  const completedRow = [...row, "."];

  for (let z = 0; z < completedRow.length; z++) {
    if (!completedRow[z].match(/[0-9]|\./)) {
      symbolsToCheck.add({
        symbol: completedRow[z],
        index: z,
        row: rowIndex,
      });
    }
  }
  return [...symbolsToCheck];
};
