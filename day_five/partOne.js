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
    const lines = input.split("\n\n");
    const [rawSeedNumbers, ...rawMappings] = lines;
    const seedNumbers = rawSeedNumbers.split(": ")[1].match(/\d+/g).map(Number);
    const mappings = rawMappings.map((mapping) => mapping
        .split(":\n")[1]
        .split("\n")
        .map((m) => m.match(/\d+/g).flat().map(Number))
        .sort((a, b) => (a[1] > b[1] ? -1 : 1)));
    const locations = seedNumbers.map((seedNumber) => {
        let nextNumber = seedNumber;
        const foundLocation = mappings.reduce((acc, map) => {
            const foundNext = map.find((i) => nextNumber > i[1] && nextNumber < i[1] + i[2]);
            if (typeof foundNext !== "undefined") {
                nextNumber = nextNumber - foundNext[1] + foundNext[0];
            }
            acc = nextNumber;
            console.log({ nextNumber });
            return acc;
        }, 0);
        return foundLocation;
    });
    console.log(Math.min(...locations));
}
main();
