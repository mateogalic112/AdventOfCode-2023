"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const input = fs_1.default.readFileSync("./inputTwo.txt", "utf-8");
const games = input.split("\n");
const result = games.reduce((acc, game) => {
    const cubes = {
        red: 0,
        green: 0,
        blue: 0,
    };
    const [, gameMoves] = game.split(": ");
    const move = gameMoves.split("; ");
    move.forEach((combination) => {
        combination.split(", ").forEach((item) => {
            const [value, color] = item.split(" ");
            if (cubes[color] < Number(value)) {
                cubes[color] = Number(value);
            }
        });
    });
    return acc + cubes.red * cubes.green * cubes.blue;
}, 0);
console.log(result);
