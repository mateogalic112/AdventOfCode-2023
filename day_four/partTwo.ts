import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputTwo.txt", "utf8");
  const lines = input.split("\n");

  const winningCopies: Record<string, number> = {};
  const copyTimes: Record<number, number> = {};

  lines.forEach((line) => {
    const [card, parsedLine] = line.split(": ");
    const cardNumber = parseInt(card.replace(/[^0-9]/g, ""), 10);

    const [winningNumbers, myNumbers] = parsedLine.split(" | ");

    const parsedWinningNumbers = winningNumbers.match(/\d+/g)!.map(Number);
    const parsedMyNumbers = myNumbers.match(/\d+/g)!.map(Number);

    const winnings = parsedMyNumbers.filter((n) =>
      parsedWinningNumbers.includes(n)
    );

    winningCopies[cardNumber] = winnings.length;
    // {1: 5}, {2: 2}

    if (typeof copyTimes[cardNumber] === "undefined") {
      copyTimes[cardNumber] = 1;
    } else {
      copyTimes[cardNumber] += 1;
    }

    for (let i = 0; i < copyTimes[cardNumber]; ++i) {
      for (let j = 0; j < winningCopies[cardNumber]; ++j) {
        if (typeof copyTimes[cardNumber + j + 1] === "undefined") {
          copyTimes[cardNumber + j + 1] = 1;
        } else {
          copyTimes[cardNumber + j + 1] += 1;
        }
      }
    }
  });

  const sum = Object.values(copyTimes).reduce((acc, copy) => acc + copy, 0);
  console.log({ sum });
}

main();
