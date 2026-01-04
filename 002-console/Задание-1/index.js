const yargs = require("yargs/yargs"); 
const { hideBin } = require("yargs/helpers"); 

const argv = yargs(hideBin(process.argv))
  .option("year", { 
    alias: "y",
    type: "string",
    description: "Показать год",
  })
    .option("month", { 
    alias: "m",
    type: "string",
    description: "Показать месяц",
  })
  .option("date", {
    alias: "d",
    type: "string",
    description: "Показать день",
  })
  .argv;

console.log(argv);

