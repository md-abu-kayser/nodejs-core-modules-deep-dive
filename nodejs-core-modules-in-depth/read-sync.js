const fs = require("fs");

console.log("Start Reading.....");

const data = fs.readFileSync("./data/diary.txt");

console.log(data);
