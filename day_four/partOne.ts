import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputOne.txt", "utf8");
  const lines = input.split("\n");
  console.log(lines);

  const result = lines.reduce((lineAcc, line) => {
    const parsedLine = line.split(": ")[1];

    const [winningNumbers, myNumbers] = parsedLine.split(" | ");

    const parsedWinningNumbers = winningNumbers.match(/\d+/g)!.map(Number);
    const parsedMyNumbers = myNumbers.match(/\d+/g)!.map(Number);

    const winnings = parsedMyNumbers.filter((n) =>
      parsedWinningNumbers.includes(n)
    );

    if (!winningNumbers.length) return lineAcc;

    let totalWinnings = 0;
    for (let i = 0; i < winnings.length; ++i) {
      if (i === 0) {
        totalWinnings = 1;
      } else {
        totalWinnings *= 2;
      }
    }

    return lineAcc + totalWinnings;
  }, 0);
  console.log({ result });
}

main();
