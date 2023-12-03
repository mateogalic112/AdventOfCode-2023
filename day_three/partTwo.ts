import * as fs from "fs";

type NumberWithStartIndex = {
  [x: string]: number;
};

const findGearIndexes = (line: string) => {
  return [...line.matchAll(new RegExp("\\*", "gi"))].map(
    (result) => result.index
  ) as number[];
};

const lineNumberWithStartingIndex = (line: string) => {
  if (!line) return [];

  const lineNumbers = line.match(/\d+/g);
  if (!lineNumbers) return [];

  let linePointer = 0;
  const lineNumberStartingIndexes = lineNumbers.map((number) => {
    const newLinePointer = line.indexOf(number, linePointer);
    linePointer = newLinePointer + number.length;
    return newLinePointer;
  });

  // match numbers with indexes
  const numberMap = lineNumbers.map((number, idx) => ({
    [number]: lineNumberStartingIndexes![idx],
  }));

  return numberMap;
};

const checkGearMultiplier = (
  gearIndex: number,
  numberWithStartIndexArray: NumberWithStartIndex[]
) => {
  const numberCoveringAreas = numberWithStartIndexArray.map((n) => {
    const key = Object.keys(n)[0];
    const startingIndex = n[key];
    return [parseInt(key), startingIndex, startingIndex + key.length];
  });

  const foundKeys = numberCoveringAreas.filter(
    (n) => gearIndex > n[1] - 2 && gearIndex < n[2] + 1
  );

  if (foundKeys.length !== 2) return 0;
  const result = foundKeys[0][0] * foundKeys[1][0];

  return result;
};

function main() {
  const input = fs.readFileSync("inputTwo.txt", "utf8");
  const lines = input.split("\n");

  const result = lines.reduce((acc, line, index) => {
    const topNumberMap = lineNumberWithStartingIndex(lines[index - 1]);
    const currentNumberMap = lineNumberWithStartingIndex(line);
    const bottomNumberMap = lineNumberWithStartingIndex(lines[index + 1]);

    const numberCoveringMap = [
      ...topNumberMap,
      ...currentNumberMap,
      ...bottomNumberMap,
    ];

    const lineGears = findGearIndexes(line);

    const gearsSum = lineGears.reduce((gearSum, gear) => {
      const multiplerGear = checkGearMultiplier(gear, numberCoveringMap);
      return gearSum + multiplerGear;
    }, 0);

    return acc + gearsSum;
  }, 0);
  console.log({ result });
}

main();
