const fs = require("fs");

// Append file

fs.writeFileSync("./output/app.log", "Application Started\n");
console.log("file created");

// const logEntry1 = `${new Date().toISOString()} user logged in\n`;
// fs.appendFileSync("./output/app.log", logEntry1);
