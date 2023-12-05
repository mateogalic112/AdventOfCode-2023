import { log } from "console";
import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputTwo.txt", "utf8");
  const lines = input.split("\n\n");

  const [rawSeedNumberRanges, ...rawMappings] = lines;

  const seedNumberRanges = rawSeedNumberRanges
    .split(": ")[1]
    .match(/\d+/g)!
    .map(Number)
    .map((item, index, arr) => {
      if (index % 2 !== 0) return;
      return [item, item + arr[index + 1] - 1];
    })
    .filter((i) => typeof i !== "undefined") as number[][];

  console.log({ seedNumberRanges });

  const minRange = seedNumberRanges.sort((a, b) => a[0] - b[0])[0][0];
  const maxRange = seedNumberRanges.sort((a, b) => a[1] - b[1])[1][1];

  const mappings = rawMappings.map((mapping) =>
    mapping
      .split(":\n")[1]
      .split("\n")
      .map((m) => m.match(/\d+/g)!.flat().map(Number))
      .sort((a, b) => (a[1] > b[1] ? -1 : 1))
  );

  const mergedArr = [minRange, maxRange];
  console.log({ mergedArr });

  let loc: number | null = null;
  for (let i = mergedArr[0]; i < mergedArr[1]; ++i) {
    let nextNumber = i;
    const foundLocation = mappings.reduce((acc, map) => {
      const foundNext = map.find(
        (mapItem) =>
          nextNumber >= mapItem[1] && nextNumber < mapItem[1] + mapItem[2]
      );

      if (typeof foundNext !== "undefined") {
        nextNumber = nextNumber - foundNext[1] + foundNext[0];
      }

      acc = nextNumber;

      return acc;
    }, nextNumber);

    if (!loc || foundLocation < loc) {
      loc = foundLocation;
    }
  }
  console.log(loc);
}

main();
