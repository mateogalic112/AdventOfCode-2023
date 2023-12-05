import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputOne.txt", "utf8");
  const lines = input.split("\n\n");

  const [rawSeedNumbers, ...rawMappings] = lines;

  const seedNumbers = rawSeedNumbers.split(": ")[1].match(/\d+/g)!.map(Number);

  const mappings = rawMappings.map((mapping) =>
    mapping
      .split(":\n")[1]
      .split("\n")
      .map((m) => m.match(/\d+/g)!.flat().map(Number))
      .sort((a, b) => (a[1] > b[1] ? -1 : 1))
  );

  const locations = seedNumbers.map((seedNumber) => {
    let nextNumber = seedNumber;
    const foundLocation = mappings.reduce((acc, map) => {
      const foundNext = map.find(
        (i) => nextNumber > i[1] && nextNumber < i[1] + i[2]
      );

      if (typeof foundNext !== "undefined") {
        nextNumber = nextNumber - foundNext[1] + foundNext[0];
      }

      acc = nextNumber;
      console.log({ nextNumber });

      return acc;
    }, 0);
    return foundLocation;
  });

  console.log(Math.min(...locations));
}

main();
