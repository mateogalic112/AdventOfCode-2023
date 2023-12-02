import * as fs from "fs";

const validDigits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

function main() {
  const input = fs.readFileSync("input.txt", "utf8");
  const lines = input.split("\n");

  const result = lines.reduce((acc, line) => {
    if (!line || !line.length) return acc;

    let leftDigit = traverseLineFromLeft(line, 0);
    let rightDigit = traverseLineFromRight(line, line.length - 1);

    const sum = `${leftDigit}${rightDigit}`;
    console.log(sum);

    return acc + parseInt(sum);
  }, 0);

  console.log(result);
}

function traverseLineFromLeft(line: string, pointer: number): number {
  if (pointer > line.length) return 0;

  if (Number.isInteger(parseInt(line[pointer]))) {
    return parseInt(line[pointer]);
  }

  const foundKey = Object.keys(validDigits).find(
    (key) => line.substring(pointer, pointer + key.length) === key
  );
  if (foundKey) return validDigits[foundKey as keyof typeof validDigits];

  return traverseLineFromLeft(line, pointer + 1);
}

function traverseLineFromRight(line: string, pointer: number): number {
  if (pointer === -1) return 0;

  if (Number.isInteger(parseInt(line[pointer]))) {
    return parseInt(line[pointer]);
  }

  const foundKey = Object.keys(validDigits).find(
    (key) => line.substring(pointer, pointer + key.length) === key
  );
  if (foundKey) return validDigits[foundKey as keyof typeof validDigits];

  return traverseLineFromRight(line, pointer - 1);
}

main();
