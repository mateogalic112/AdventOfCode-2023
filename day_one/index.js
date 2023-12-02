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
        if (!line || !line.length)
            return acc;
        let leftDigit = traverseLineFromLeft(line, 0);
        let rightDigit = traverseLineFromRight(line, line.length - 1);
        const sum = `${leftDigit}${rightDigit}`;
        console.log(sum);
        return acc + parseInt(sum);
    }, 0);
    console.log(result);
}
function traverseLineFromLeft(line, pointer) {
    if (pointer > line.length)
        return 0;
    if (Number.isInteger(parseInt(line[pointer]))) {
        return parseInt(line[pointer]);
    }
    const foundKey = Object.keys(validDigits).find((key) => line.substring(pointer, pointer + key.length) === key);
    if (foundKey)
        return validDigits[foundKey];
    return traverseLineFromLeft(line, pointer + 1);
}
function traverseLineFromRight(line, pointer) {
    if (pointer === -1)
        return 0;
    if (Number.isInteger(parseInt(line[pointer]))) {
        return parseInt(line[pointer]);
    }
    const foundKey = Object.keys(validDigits).find((key) => line.substring(pointer, pointer + key.length) === key);
    if (foundKey)
        return validDigits[foundKey];
    return traverseLineFromRight(line, pointer - 1);
}
main();
