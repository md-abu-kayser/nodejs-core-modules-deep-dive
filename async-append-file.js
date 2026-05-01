const fs = require("fs");

function logMessage(message) {
  const logEntry = `${new Date().toISOString()} ${message}\n`;
  fs.appendFile("./output/app.log", logEntry, (error) => {
    if (error) {
      console.error("Logging failed:", error.message);
      return;
    }
    console.log("Log saved");
  });
}

logMessage("user logged in");
logMessage("password matched");
logMessage("token generated");
