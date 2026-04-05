const fs = require("fs");
// Synchronous file deleted
fs.writeFileSync("./output/temp.txt", "This is a temp file");
console.log("Temp File Created");

if (fs.existsSync("./output/temp.txt")) {
  console.log("file exits!!!");
  fs.unlinkSync("./output/temp.txt");
  console.log("file deleted");
}

try {
  fs.unlinkSync("./output/temp.txt");
} catch (error) {
  console.log("ERROR :", error.message);
}
