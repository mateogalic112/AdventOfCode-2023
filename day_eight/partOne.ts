import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputOne.txt", "utf8");
  const [directions, rawLines] = input.split("\n\n");

  const lines = rawLines.split("\n");

  let steps = 0;
  let currentPostion = "AAA";
  while (currentPostion !== "ZZZ") {
    const direction = directions[steps % directions.length]; // L or R

    const rawOptionsTuple = lines
      .find((l) => l.startsWith(currentPostion))!
      .split(" = ")[1];

    const nextOptionIndex = direction === "L" ? 0 : 1;
    const nextOption = rawOptionsTuple.slice(1, -1).split(", ")[
      nextOptionIndex
    ];

    currentPostion = nextOption;
    steps++;
  }

  console.log({ steps });
}

main();
