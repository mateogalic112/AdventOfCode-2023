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
const findGearIndexes = (line) => {
    return [...line.matchAll(new RegExp("\\*", "gi"))].map((result) => result.index);
};
const lineNumberWithStartingIndex = (line) => {
    if (!line)
        return [];
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
const checkGearMultiplier = (gearIndex, numberWithStartIndexArray) => {
    const numberCoveringAreas = numberWithStartIndexArray.map((n) => {
        const key = Object.keys(n)[0];
        const startingIndex = n[key];
        return [parseInt(key), startingIndex, startingIndex + key.length];
    });
    console.log({ numberCoveringAreas });
    const foundKeys = numberCoveringAreas.filter((n) => gearIndex > n[1] - 2 && gearIndex < n[2] + 1);
    console.log({ foundKeys });
    console.log({ gearIndex });
    if (foundKeys.length !== 2)
        return 0;
    const result = foundKeys[0][0] * foundKeys[1][0];
    console.log({ result });
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
