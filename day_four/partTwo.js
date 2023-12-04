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
    const input = fs.readFileSync("inputTwo.txt", "utf8");
    const lines = input.split("\n");
    const winningCopies = {};
    const copyTimes = {};
    lines.forEach((line) => {
        const [card, parsedLine] = line.split(": ");
        const cardNumber = parseInt(card.replace(/[^0-9]/g, ""), 10);
        const [winningNumbers, myNumbers] = parsedLine.split(" | ");
        const parsedWinningNumbers = winningNumbers.match(/\d+/g).map(Number);
        const parsedMyNumbers = myNumbers.match(/\d+/g).map(Number);
        const winnings = parsedMyNumbers.filter((n) => parsedWinningNumbers.includes(n));
        winningCopies[cardNumber] = winnings.length;
        // {1: 5}, {2: 2}
        if (typeof copyTimes[cardNumber] === "undefined") {
            copyTimes[cardNumber] = 1;
        }
        else {
            copyTimes[cardNumber] += 1;
        }
        for (let i = 0; i < copyTimes[cardNumber]; ++i) {
            for (let j = 0; j < winningCopies[cardNumber]; ++j) {
                if (typeof copyTimes[cardNumber + j + 1] === "undefined") {
                    copyTimes[cardNumber + j + 1] = 1;
                }
                else {
                    copyTimes[cardNumber + j + 1] += 1;
                }
            }
        }
    });
    const sum = Object.values(copyTimes).reduce((acc, copy) => acc + copy, 0);
    console.log({ sum });
}
main();
