const fs = require('fs');
const { getRec, getSmp } = require("./crawl.js");
const cron = require("node-cron");

const rotate = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 2020 29
let count = 0;

async function handleAsync(name, year, month, day) {
  
  const smp = await getSmp(year, month, day);
  console.log("smp", smp);

  let str = JSON.stringify(smp, null, 4)

  fs.writeFile(name, str, 'utf8', (err, data) => {
    console.log('write succes', data);
  });
  count++;
}

cron.schedule("*/5 * * * * *", async () => {
let year = 2020
let month = 1
let day = 31

 month += count

if (month > 6) {
  return process.exit(0);
}

day = rotate[month - 1];

let name = `./${year}${month}${day}.txt`;

  console.log("running a task every two minutes");
  await handleAsync(name, year, month, day);
});