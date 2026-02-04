#!/usr/bin/env node

const readline = require("readline");
const fs = require("node:fs");
const path = require("node:path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const logFileName = process.argv[2];

if (!logFileName) {
  console.log("Укажите файл для записи результатов игры");
  process.exit(1);
}

const logFilePath = path.join(__dirname, logFileName);
const number = Math.round(Math.random() * 1);

function readLines(logFilePath) {
  try {
    const data = fs.readFileSync(logFilePath, "utf-8");
    const matches = data.match(/[01],/g);
    return matches ? matches.length + 1 : 1;
  } catch (err) {
    return 1;
  }
}

function gameLogic(promptText, logFilePath) {
  rl.question(promptText, (answer) => {
    let tryNumber = readLines(logFilePath);

    if (isNaN(answer)) {
      console.log("Пожалуйста, введите число!");
      gameLogic("Введите число:", logFilePath);
      return;
    } else if (number != answer) {
      fs.appendFileSync(logFilePath, `0,\n`);
      console.log("Неверно! Вы проиграли");
      rl.close();
    } else {
      fs.appendFileSync(logFilePath, `1,\n`);
      console.log("Отгадано число", answer);

      rl.close();
    }
  });
}

gameLogic("Загадан 0 или 1. Попробуйте его угадать: ", logFilePath);
