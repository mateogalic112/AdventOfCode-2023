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
const lineSymbolIndexes = (line) => {
    if (!line)
        return [];
    const lineSymbols = line.match(/[^0-9.]/g);
    if (!lineSymbols)
        return [];
    let linePointer = 0;
    const lineSymbolIndexes = lineSymbols.map((symbol) => {
        const newLinePointer = line.indexOf(symbol, linePointer);
        linePointer = newLinePointer + 1;
        return newLinePointer;
    });
    return lineSymbolIndexes;
};
const lineNumberWithStartingIndex = (line) => {
    const lineNumbers = line.match(/\d+/g);
    if (!lineNumbers)
        return [];
    let linePointer = 0;
    const lineNumberStartingIndexes = lineNumbers.map((number) => {
        const newLinePointer = line.indexOf(number, linePointer);
        linePointer = newLinePointer + number.length;
        return newLinePointer;
    });
    // match numbers with indexes
    const numberMap = lineNumbers.map((number, idx) => ({
        [number]: lineNumberStartingIndexes[idx],
    }));
    return numberMap;
};
const checkIsAdjacentToSymbol = (numberWithStartIndex, lineSymbolIndexes) => {
    const key = Object.keys(numberWithStartIndex)[0];
    const startingIndex = numberWithStartIndex[key];
    const coveringIndexes = [startingIndex, startingIndex + key.length - 1];
    const found = lineSymbolIndexes.find((symbolIdx) => symbolIdx > coveringIndexes[0] - 2 && symbolIdx < coveringIndexes[1] + 2);
    if (typeof found !== "undefined")
        return parseInt(key);
    return 0;
};
function main() {
    const input = fs.readFileSync("inputOne.txt", "utf8");
    const lines = input.split("\n");
    const result = lines.reduce((acc, line, index) => {
        const topLineSymbols = lineSymbolIndexes(lines[index - 1]);
        const currentLineSymbols = lineSymbolIndexes(line);
        const bottomLineSymbols = lineSymbolIndexes(lines[index + 1]);
        const symbols = [
            ...topLineSymbols,
            ...currentLineSymbols,
            ...bottomLineSymbols,
        ];
        const numberMap = lineNumberWithStartingIndex(line);
        const adjacentNumbers = numberMap.map((number) => {
            return checkIsAdjacentToSymbol(number, symbols);
        });
        const adjacentNumbersSum = adjacentNumbers.reduce((adjacentSum, number) => {
            return adjacentSum + number;
        }, 0);
        return acc + adjacentNumbersSum;
    }, 0);
    console.log({ result });
}
main();
