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

const checkPossibleGames = (testData) => {
  const gamesFinalPowers = [];

  testData.forEach((data) => {
    const [gameData] = data.split(":");
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
    console.log(reducedGameData);
    const gamePower = Object.entries(reducedGameData).reduce((acc, curr) => {
      return acc * curr[1];
    }, 1);
    gamesFinalPowers.push(gamePower);
  });
  return gamesFinalPowers.reduce((acc, cur) => (acc += parseInt(cur)), 0);
};

console.log(checkPossibleGames(testData.split("\n")));
