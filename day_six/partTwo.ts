import * as fs from "fs";

function main() {
  const input = fs.readFileSync("inputTwo.txt", "utf8");
  const lines = input.split("\n");

  const [time, distance] = lines.map((l) => parseInt(l.replace(/\D/g, "")));
  console.log({ time, distance });

  let numberOfWaysToWin = 0;

  for (
    let holdingButtonTime = 0;
    holdingButtonTime <= time;
    ++holdingButtonTime
  ) {
    if (holdingButtonTime * (time - holdingButtonTime) > distance) {
      numberOfWaysToWin++;
    }
  }

  console.log({ numberOfWaysToWin });
}

main();
