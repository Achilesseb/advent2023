const fs = require("fs");
const { default: test } = require("node:test");

const testData = fs.readFileSync("./data.txt", "utf8");

const MAX_BLUE = 14;
const MAX_RED = 12;
const MAX_GREEN = 13;

const formatGameData = (gameData) => {
  let gameFormattedData = [];
  const gamePhases = gameData.split(";");

  gamePhases.forEach((phase) => {
    const phaseCubesTypes = phase.split(",");
    const cubesTypes = phaseCubesTypes.map((cubesTypes) => {
      const cubes = cubesTypes.trim().split(" ");
      return {
        [cubes[1]]: cubes[0],
      };
    });
    gameFormattedData.push(cubesTypes);
  });
  return gameFormattedData.flat();
};

const checkGame = (gameData) => {
  if (
    gameData["blue"] <= MAX_BLUE &&
    gameData["red"] <= MAX_RED &&
    gameData["green"] <= MAX_GREEN
  ) {
    return true;
  }
  return false;
};

const checkPossibleGames = (testData) => {
  const possibleGamesIds = [];

  testData.forEach((data) => {
    const [gameId, gameData] = data.split(":");
    const formattedGameData = formatGameData(gameData);
    const reducedGameData = formattedGameData.reduce(
      (acc, curr) => {
        const mappedData = Object.entries(curr).flat();

        if (parseInt(mappedData[1]) > parseInt(acc[mappedData[0]]))
          return {
            ...acc,
            [mappedData[0]]: mappedData[1],
          };
        return acc;
      },
      {
        blue: 0,
        red: 0,
        green: 0,
      }
    );
    const isValidGame = checkGame(reducedGameData);
    console.log(gameId);
    if (isValidGame) possibleGamesIds.push(gameId.split(" ")[1]);
  });
  return possibleGamesIds.reduce((acc, cur) => (acc += parseInt(cur)), 0);
};

console.log(checkPossibleGames(testData.split("\n")));
