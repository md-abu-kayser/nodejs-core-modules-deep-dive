const fs = require("fs");

// Sync create and delete
fs.writeFileSync("./output/temp.txt", "this is a temp file");
console.log("File created");

if (fs.existsSync("./output/temp.txt")) {
  console.log("file exists");

  fs.unlinkSync("./output/temp.txt");
  console.log("file deleted");
}

try {
  fs.unlinkSync("./output/temp.txt");
} catch (error) {
  console.error("ERROR:", error.message);
}

// Async create and delete
fs.writeFile("./output/temp2.txt", "Another temp file", (err) => {
  if (err) return console.error(err.message);

  console.log("Another temp file created");

  fs.unlink("./output/temp2.txt", (err) => {
    if (err) {
      console.error("ERROR:", err.message);
    } else {
      console.log("File deleted");
    }
  });
});
