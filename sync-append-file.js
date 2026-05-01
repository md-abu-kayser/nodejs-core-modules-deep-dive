const fs = require("fs");

// fs.writeFileSync("./output/app.log", "Application Started\n");
// console.log("file created");

const logEntry1 = `${new Date().toISOString()} user logged in\n`;
fs.appendFileSync("./output/app.log", logEntry1);

const logEntry2 = `${new Date().toISOString()} data fetched\n`;
fs.appendFileSync("./output/app.log", logEntry2);
console.log("task completed");

// --------------------------------------------------
// use function
function logMessage(message) {
  const logEntry = `${new Date().toISOString()} ${message}\n`;

  try {
    fs.appendFileSync("./output/app.log", logEntry);
    console.log("Log saved");
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}

logMessage("user logged in");
logMessage("password matched");
logMessage("token generated");
