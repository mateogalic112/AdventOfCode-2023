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
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

  const handResult = Object.entries(handCheck)
    .filter((entry) => entry[0] !== "J")
    .map((entry) => entry[1]);

  const jokers = handCheck["J"] || 0;

  // five of a kind
  if (handResult.find((v) => v + jokers === 5)) {
    return 0;
  }

  // four of a kind
  if (handResult.find((v) => v + jokers === 4)) {
    return 1;
  }

  // full house
  if (
    [3, 2].every((v) => handResult.includes(v)) ||
    (handResult.filter((v) => v === 2).length === 2 && jokers === 1)
  ) {
    return 2;
  }

  // three of a kind
  if (handResult.find((v) => v + jokers === 3)) {
    return 3;
  }

  // two pair
  if (handResult.filter((v) => v === 2).length === 2) {
    return 4;
  }

  // one pair
  if (handResult.find((v) => v === 2) || jokers) {
    return 5;
  }

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
