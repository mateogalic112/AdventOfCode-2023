"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const cubeConfig = {
    red: 12,
    green: 13,
    blue: 14,
};
const input = fs_1.default.readFileSync("./inputOne.txt", "utf-8");
const games = input.split("\n");
const result = games.reduce((acc, game) => {
    const [gameName, gameMoves] = game.split(": ");
    const gameIndex = gameName.split(" ")[1];
    const moves = gameMoves.split("; ");
    const validGame = moves.every((move) => {
        const combinations = move.split(", ");
        return combinations.every((combo) => {
            const [value, color] = combo.split(" ");
            return cubeConfig[color] >= Number(value);
        });
    });
    if (validGame) {
        return acc + Number(gameIndex);
    }
    return acc;
}, 0);
console.log(result);
