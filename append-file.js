// append file
const fs = require("fs");

fs.writeFileSync("./output/app.log", "Application Started \n");
console.log("File created");

const logEntry1 = `${new Date().toISOString()} user logged in\n`;
fs.appendFileSync("./output/app.log", logEntry1);

const logEntry2 = `${new Date().toISOString()} data fetched\n`;
fs.appendFileSync("./output/app.log", logEntry2);

console.log("task completed");
