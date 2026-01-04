#!/usr/bin/env node

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command(
    "current",
    "Показать текущую дату iso/[-y] год/ [-m] месяц/ [-d] день",
    (yargs) => {
      return yargs
        .option("year", {
          alias: "y",
          type: "boolean",
          description: "Показать год",
        })
        .option("month", {
          alias: "m",
          type: "boolean",
          description: "Показать месяц",
        })
        .option("date", {
          alias: "d",
          type: "boolean",
          description: "Показать день",
        });
    },
    (argv) => {
      const currentDate = new Date();

      if (argv.year) {
        console.log(currentDate.getFullYear());
      } else if (argv.month) {
        console.log(currentDate.toLocaleString("ru-RU", { month: "long" }));
      } else if (argv.date) {
        console.log(currentDate.getDate());
      } else {
        console.log(currentDate.toISOString());
      }
    }
  )

  .command(
    "add",
    "Прибавить к текущей дате [-y] год [-m] месяц [-d] день",
    (yargs) => {
      return yargs
        .option("year", {
          alias: "y",
          type: "number",
          description: "Прибавить год",
        })
        .option("month", {
          alias: "m",
          type: "number",
          description: "Прибавить месяц",
        })
        .option("date", {
          alias: "d",
          type: "number",
          description: "Прибавить день",
        });
    },
    (argv) => {
      let currentDate = new Date();

      if (argv.year !== undefined) {
        currentDate.setFullYear(currentDate.getFullYear() + argv.year);
      }
      if (argv.month !== undefined) {
        currentDate.setMonth(currentDate.getMonth() + argv.month);
      }
      if (argv.date !== undefined) {
        currentDate.setDate(currentDate.getDate() + argv.date);
      }
      console.log(currentDate.toISOString());
    }
  )

  .command(
    "sub",
    "Вычесть из текущей даты [-y] год [-m] месяц [-d] день",
    (yargs) => {
      return yargs
        .option("year", {
          alias: "y",
          type: "number",
          description: "Вычесть год",
        })
        .option("month", {
          alias: "m",
          type: "number",
          description: "Вычесть месяц",
        })
        .option("date", {
          alias: "d",
          type: "number",
          description: "Вычесть день",
        });
    },
    (argv) => {
      let currentDate = new Date();

      if (argv.year !== undefined) {
        currentDate.setFullYear(currentDate.getFullYear() - argv.year);
      }
      if (argv.month !== undefined) {
        currentDate.setMonth(currentDate.getMonth() - argv.month);
      }
      if (argv.date !== undefined) {
        currentDate.setDate(currentDate.getDate() - argv.date);
      }
      console.log(currentDate.toISOString());
    }
  )

  .parse();
