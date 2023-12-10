const fs = require("fs");

const testData = fs.readFileSync("./data.txt", "utf8");

const testDataArray = testData.split("\n");

//Slower but gets the actual number of cards with ids.
// const cards = new Set();
let cardsNumber = 0;

const calculateElfsTotalScore = (cardsArray) => {
  for (let i = 0; i < cardsArray.length; i++) {
    let repeats = 0;
    const cardId = cardsArray[i].split(":")[0];
    const cardWinningNumbers = cardsArray[i]
      .slice(cardsArray[i].indexOf(":") + 1, cardsArray[i].indexOf("|"))
      .trim()
      .split(/\s+/g);

    const elfsCardGuessedNumbers = cardsArray[i]
      .slice(cardsArray[i].indexOf("|") + 1)
      .trim()
      .split(/\s+/g);

    for (let z = 0; z < elfsCardGuessedNumbers.length; z++) {
      if (cardWinningNumbers.includes(elfsCardGuessedNumbers[z])) repeats++;
    }

    //Slower but gets the actual number of cards with ids.
    // cards.add({ cardId, value: 1 });
    cardsNumber++;
    if (repeats > 0) {
      const nestedArray = testDataArray.slice(
        parseInt(cardId.split(/\s+/g)[1]),
        parseInt(cardId.split(/\s+/g)[1]) + repeats
      );
      calculateElfsTotalScore(nestedArray);
    }
  }
};
console.time("Calculatin' cards recursively");
calculateElfsTotalScore(testDataArray);
console.timeEnd("Calculatin' cards recursively");

//Slower but gets the actual number of cards with ids.
// const result = [...calculateElfsTotalScore(testDataArray)].reduce(
//   (acc, cur) => {
//     if (Object.keys(acc).includes(cur.cardId)) {
//       return {
//         ...acc,
//         [cur.cardId]: acc[cur.cardId] + 1,
//       };
//     } else
//       return {
//         ...acc,
//         [cur.cardId]: cur.value,
//       };
//   },
//   {}
// );

console.log("Part 2 cards numbers: ", cardsNumber);
