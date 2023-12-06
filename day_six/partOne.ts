import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputOne.txt", "utf8");
  const lines = input.split("\n");

  const [time, distance] = lines.map((l) => l.match(/\d+/g)!.map(Number));
  console.log({ time, distance });

  const result = time.reduce((acc: number[], timeValue, index) => {
    let numberOfWaysToWin = 0;

    for (
      let holdingButtonTime = 0;
      holdingButtonTime <= timeValue;
      ++holdingButtonTime
    ) {
      if (
        holdingButtonTime * (timeValue - holdingButtonTime) >
        distance[index]
      ) {
        numberOfWaysToWin++;
      }
    }

    acc.push(numberOfWaysToWin);

    return acc;
  }, []);

  console.log(result.reduce((acc, curr) => acc * curr));
}

main();
