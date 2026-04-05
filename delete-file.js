const fs = require("fs");

// Create temp file
fs.writeFileSync("./output/temp.txt", "This is a temp file");
console.log("Temp file created");

// Check and delete synchronously
if (fs.existsSync("./output/temp.txt")) {
  console.log("File exists!!!");
  fs.unlinkSync("./output/temp.txt");
  console.log("File deleted");
}

// Try deleting again to test error handling
try {
  fs.unlinkSync("./output/temp.txt");
} catch (error) {
  console.log("ERROR:", error.message);
}

// Create another file asynchronously
fs.writeFile("./output/temp2.txt", "Another temp2 file", (err) => {
  if (err) return console.error(err.message);

  console.log("Another temp file created");

  fs.unlink("./output/temp2.txt", (err) => {
    if (err) {
      console.error("ERROR:", err.message);
    } else {
      console.log("Temp2 file deleted");
    }
  });
});
