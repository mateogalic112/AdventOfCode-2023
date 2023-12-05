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
    const lines = input.split("\n\n");
    const [rawSeedNumberRanges, ...rawMappings] = lines;
    const seedNumberRanges = rawSeedNumberRanges
        .split(": ")[1]
        .match(/\d+/g)
        .map(Number)
        .map((item, index, arr) => {
        if (index % 2 !== 0)
            return;
        return [item, item + arr[index + 1] - 1];
    })
        .filter((i) => typeof i !== "undefined");
    console.log({ seedNumberRanges });
    const minRange = seedNumberRanges.sort((a, b) => a[0] - b[0])[0][0];
    const maxRange = seedNumberRanges.sort((a, b) => a[1] - b[1])[1][1];
    const mappings = rawMappings.map((mapping) => mapping
        .split(":\n")[1]
        .split("\n")
        .map((m) => m.match(/\d+/g).flat().map(Number))
        .sort((a, b) => (a[1] > b[1] ? -1 : 1)));
    const mergedArr = [minRange, maxRange];
    console.log({ mergedArr });
    let loc = null;
    for (let i = mergedArr[0]; i < mergedArr[1]; ++i) {
        let nextNumber = i;
        const foundLocation = mappings.reduce((acc, map) => {
            const foundNext = map.find((mapItem) => nextNumber >= mapItem[1] && nextNumber < mapItem[1] + mapItem[2]);
            if (typeof foundNext !== "undefined") {
                nextNumber = nextNumber - foundNext[1] + foundNext[0];
            }
            acc = nextNumber;
            return acc;
        }, nextNumber);
        if (!loc || foundLocation < loc) {
            loc = foundLocation;
        }
    }
    console.log(loc);
}
main();
