"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
function main() {
    const input = fs.readFileSync("inputOne.txt", "utf8");
    const lines = input.split("\n");
    const [time, distance] = lines.map((l) => l.match(/\d+/g).map(Number));
    console.log({ time, distance });
    const result = time.reduce((acc, timeValue, index) => {
        let numberOfWaysToWin = 0;
        for (let holdingButtonTime = 0; holdingButtonTime <= timeValue; ++holdingButtonTime) {
            if (holdingButtonTime * (timeValue - holdingButtonTime) >
                distance[index]) {
                numberOfWaysToWin++;
            }
        }
        acc.push(numberOfWaysToWin);
        return acc;
    }, []);
    console.log(result.reduce((acc, curr) => acc * curr));
}
main();
