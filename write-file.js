const fs = require("fs");
// Synchronous
const content1 = "This is a content one\n Synchronous Write File!!!";

try {
  fs.writeFileSync("./output/test-sync.txt", content1);
  console.log("sync file written");
} catch (err) {
  console.error(err.message);
}

// Asynchronous
const content2 = "This is content two\n ASynchronous Write File!!!";

fs.writeFile("./output/test-async.txt", content2, (error) => {
  if (error) {
    console.error(error.message);
  } else {
    console.log("async file written");
  }
});
