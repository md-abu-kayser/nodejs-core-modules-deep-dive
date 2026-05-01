const fs = require("fs");

fs.readFile("./data/diary.txt", "utf-8", (error, data) => {
  if (error) {
    console.error("error happened: ", error.message);
    return;
  }

  console.log("file content:");
  console.log(data);
});

console.log("This runs immediately - no blocking");
