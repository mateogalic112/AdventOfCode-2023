import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputTwo.txt", "utf8");
  const [directions, rawLines] = input.split("\n\n");

  const lines = rawLines.split("\n");

  let steps = 0;

  let startingNodes = lines
    .filter((l) => l[2] === "A")
    .map((l) => l.slice(0, 3));

  const nodeToZ: number[] = [];

  startingNodes.forEach((node) => {
    while (node[2] !== "Z") {
      const direction = directions[steps % directions.length]; // L or R

      const rawOptionsTuple = lines
        .find((l) => l.startsWith(node))!
        .split(" = ")[1];

      const nextOptionIndex = direction === "L" ? 0 : 1;
      const nextOption = rawOptionsTuple.slice(1, -1).split(", ")[
        nextOptionIndex
      ];

      node = nextOption;
      steps++;
    }

    nodeToZ.push(steps);
    steps = 0;
  });

  console.log(lcmArray(nodeToZ));
}

function gcd(a: number, b: number) {
  // Euclidean algorithm for the greatest common divisor
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

function lcm(a: number, b: number) {
  // Least common multiple of two numbers
  return (a * b) / gcd(a, b);
}

function lcmArray(arr: number[]) {
  // Apply LCM function across an array of numbers
  return arr.reduce((acc, val) => lcm(acc, val));
}

main();
