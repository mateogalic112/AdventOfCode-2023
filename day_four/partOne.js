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
    console.log(lines);
    const result = lines.reduce((lineAcc, line) => {
        const parsedLine = line.split(": ")[1];
        const [winningNumbers, myNumbers] = parsedLine.split(" | ");
        const parsedWinningNumbers = winningNumbers.match(/\d+/g).map(Number);
        const parsedMyNumbers = myNumbers.match(/\d+/g).map(Number);
        const winnings = parsedMyNumbers.filter((n) => parsedWinningNumbers.includes(n));
        if (!winningNumbers.length)
            return lineAcc;
        let totalWinnings = 0;
        for (let i = 0; i < winnings.length; ++i) {
            if (i === 0) {
                totalWinnings = 1;
            }
            else {
                totalWinnings *= 2;
            }
        }
        return lineAcc + totalWinnings;
    }, 0);
    console.log({ result });
}
main();
