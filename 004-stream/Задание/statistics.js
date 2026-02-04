#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const logFileName = process.argv[2];

if (!logFileName) {
  console.log("Укажите файл для анализа результатов игры");
  process.exit(1);
}

const logFilePath = path.join(__dirname, logFileName);

if (!fs.existsSync(logFilePath)) {
  console.log("Файл не найден!");
  process.exit(1);
}

const data = fs.readFileSync(logFilePath, "utf-8");
const matches = data.match(/[01],/g);
const wins = data.match(/1,/g).length;

console.log(
  `Сыграно ${matches.length} раз; Выигрышей: ${wins}. Проигрышей: ${matches.length - wins}`,
);

process.exit(0);
