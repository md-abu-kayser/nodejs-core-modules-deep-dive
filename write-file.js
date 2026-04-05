// Written Synchronous
const fs = require("fs");

const content = "This is Content \n Synchronous!!!";

try {
  fs.writeFileSync("./output/test-sync.txt", content);
  console.log("File written successfully using sync method.");
} catch (error) {
  console.error("Sync write error:", error.message);
}

// Written Asynchronous
const content2 = "This is content2 \n Asynchronous!!!";

fs.writeFile("./output/test-async.txt", content, (error) => {
  if (error) {
    console.error("Async write error:", error.message);
    return;
  }

  console.log("File written successfully using async method.");
});
