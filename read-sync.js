const fs = require("fs");

try {
  const data = fs.readFileSync("./data/diary.txt", "utf-8");
  console.log("File Statement:");
  console.log(data);
} catch (err) {
  console.error(err.message);
}

console.log("Finished");
