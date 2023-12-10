const fs = require("fs");

const testData = fs.readFileSync("./data.txt", "utf8");

const testDataArray = testData.split("\n");

const calculateCardScore = (guessedNumbers) => 2 ** guessedNumbers.length / 2;
const calculateElfsTotalScore = (cardsArray) => {
  let totalScore = 0;
  cardsArray.forEach((card) => {
    const correctlyGuessedNumbers = [];
    const cardWinningNumbers = card
      .slice(card.indexOf(":") + 1, card.indexOf("|"))
      .trim()
      .split(/\s+/g);

    const elfsCardGuessedNumbers = card
      .slice(card.indexOf("|") + 1)
      .trim()
      .split(/\s+/g);

    elfsCardGuessedNumbers.forEach((guessedNumber) => {
      if (cardWinningNumbers.includes(guessedNumber)) {
        correctlyGuessedNumbers.push(guessedNumber);
      }
    });
    totalScore +=
      correctlyGuessedNumbers.length > 0
        ? calculateCardScore(correctlyGuessedNumbers)
        : 0;
  });
  console.log("Part 1 score: ", totalScore);
};
calculateElfsTotalScore(testDataArray);
