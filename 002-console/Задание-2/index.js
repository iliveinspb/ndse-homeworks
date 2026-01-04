#!/usr/bin/env node

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const number = Math.round(Math.random() * 100);

function gameLogic(promptText) {
  rl.question(promptText, (answer) => {
    if (isNaN(answer)) {
      console.log("Пожалуйста, введите число!");
      gameLogic("Введите число:");
      return;
    } else if (number < answer) {
      console.log("Меньше");
      gameLogic("Введите число:");
      return;
    } else if (number > answer) {
      console.log("Больше");
      gameLogic("Введите число:");
      return;
    } else {
      console.log("Отгадано число", answer);

      rl.close();
    }
  });
}

gameLogic("Загадано число в диапазоне от 0 до 100. Введите число: ");
