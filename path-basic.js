const path = require("path");

console.log("Current file info: \n");
console.log("filename: ", __filename);
console.log("Directory: ", __dirname);

console.log("\n" + "-".repeat(50) + "\n");

const filePath = "/kayser/document/nextLevel.pdf";
console.log("Analyzing path :", filePath, "\n");

console.log("Directory name : ", path.dirname(filePath));
console.log("Base name :", path.basename(filePath));
console.log("File Extension :", path.extname(filePath));
console.log("File Name :", path.basename(filePath, path.extname(filePath)));

console.log("\n" + "-".repeat(50) + "\n");

const parsed = path.parse(filePath);
console.log("Parsed path object: ", parsed);

console.log("\n" + "-".repeat(50) + "\n");

console.log("formatted path :", path.format(parsed));
