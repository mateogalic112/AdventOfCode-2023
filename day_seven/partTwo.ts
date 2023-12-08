import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputTwo.txt", "utf8");
  const lines = input.split("\n");

  const hands = lines.map((line) => {
    const [hand] = line.split(" ");
    return hand;
  });

  const handsWithAmounts = new Map(
    lines.map((line) => {
      const [hand, amount] = line.split(" ");
      return [hand, amount];
    })
  );

  const assignLevelToHand = hands.map((hand) => {
    return cardCheck(hand);
  });

  const handsWithLevels = hands.reduce((acc, hand, idx) => {
    acc[hand] = assignLevelToHand[idx];
    return acc;
  }, {} as Record<string, number>);

  const sortedHands = Object.entries(handsWithLevels).sort((a, b) => {
    if (a[1] === b[1]) {
      return !!compareHands(a[0], b[0]) ? 1 : -1;
    }

    if (a[1] > b[1]) return -1;

    return 1;
  });

  const result = sortedHands.reduce((acc, curr, i) => {
    return acc + parseInt(handsWithAmounts.get(curr[0])!) * (i + 1);
  }, 0);

  console.log({ result });
}

const cardCheck = (hand: string) => {
  const handCheck = hand
    .split("")
    .reduce((acc: Record<string, number>, curr) => {
      if (typeof acc[curr] === "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr]++;
      }
      return acc;
    }, {});

  const handResult = Object.values(handCheck);
  console.log({ handCheck });

  // five of a kind
  if (handResult.find((v) => v === 5)) return 0;
  if (handResult.find((v) => v === 4) && handCheck["J"] === 1) return 0;
  if (handResult.find((v) => v === 3) && handCheck["J"] === 2) return 0;
  if (handResult.find((v) => v === 2) && handCheck["J"] === 3) return 0;
  if (handCheck["J"] === 4) return 0;
  // four of a kind
  if (handResult.find((v) => v === 4)) return 1;
  if (handResult.find((v) => v === 3) && handCheck["J"] === 1) return 1;
  if (handResult.find((v) => v === 2) && handCheck["J"] === 2) return 1;
  if (handCheck["J"] === 3) return 1;
  // full house
  if ([3, 2].every((v) => handResult.includes(v))) return 2;
  if (
    handResult.reduce((acc, curr) => {
      if (curr === 2) acc++;
      return acc;
    }, 0) === 2 &&
    handCheck["J"] === 1
  )
    return 2;
  // three of a kind
  if (handResult.find((v) => v === 3)) return 3;
  if (handResult.find((v) => v === 2) && handCheck["J"] === 1) return 3;
  if (handCheck["J"] === 2) return 3;
  // two pair
  if (
    handResult.reduce((acc, curr) => {
      if (curr === 2) acc++;
      return acc;
    }, 0) === 2
  )
    return 4;
  // one pair
  if (handResult.find((v) => v === 2)) return 5;
  if (handCheck["J"]) return 5;
  // high card
  return 6;
};

const compareHands = (handOne: string, handTwo: string) => {
  for (let i = 0; i < handOne.length; ++i) {
    if (handOne[i] === handTwo[i]) continue;
    return (
      cardArr.findIndex((v) => handOne[i] === v) <
      cardArr.findIndex((v) => handTwo[i] === v)
    );
  }
};

const cardArr = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];

main();
