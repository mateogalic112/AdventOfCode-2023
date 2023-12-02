import fs from "fs";

const cubeConfig = {
  red: 12,
  green: 13,
  blue: 14,
};

const input = fs.readFileSync("./inputOne.txt", "utf-8");
const games = input.split("\n");

const result = games.reduce((acc, game) => {
  const [gameName, gameMoves] = game.split(": ");
  const gameIndex = gameName.split(" ")[1];

  const moves = gameMoves.split("; ");

  const validGame = moves.every((move) => {
    const combinations = move.split(", ");

    return combinations.every((combo) => {
      const [value, color] = combo.split(" ");
      return cubeConfig[color as keyof typeof cubeConfig] >= Number(value);
    });
  });

  if (validGame) {
    return acc + Number(gameIndex);
  }

  return acc;
}, 0);

console.log(result);
