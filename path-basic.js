const path = require("path");

console.log("Current File Info:\n");
console.log("filename :", __filename);
console.log("directory :", __dirname);

console.log("\n" + "-".repeat(50) + "\n");
const filePath = "/kayser/documents/nextLevel.pdf";

console.log("analyzing Path :", filePath, "\n");
console.log("Directory:", path.dirname(filePath));
console.log("Base name:", path.basename(filePath));
console.log("File Extension:", path.extname(filePath));
console.log("File name:", path.basename(filePath, path.extname(filePath)));

console.log("\n" + "-".repeat(50) + "\n");

const parsed = path.parse(filePath);
console.log("Parsed path object:", parsed);

console.log("\n" + "-".repeat(50) + "\n");
console.log("Formatted path:", path.format(parsed));
