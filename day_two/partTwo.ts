import fs from "fs";

const input = fs.readFileSync("./inputTwo.txt", "utf-8");
const games = input.split("\n");

const result = games.reduce((acc, game) => {
  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const [, gameMoves] = game.split(": ");

  const move = gameMoves.split("; ");
  move.forEach((combination) => {
    combination.split(", ").forEach((item) => {
      const [value, color] = item.split(" ");
      if (cubes[color as keyof typeof cubes] < Number(value)) {
        cubes[color as keyof typeof cubes] = Number(value);
      }
    });
  });

  return acc + cubes.red * cubes.green * cubes.blue;
}, 0);

console.log(result);
