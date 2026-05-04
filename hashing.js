// Import Node.js built-in crypto module
const crypto = require("crypto");

console.log("\n===== HASHING DEMO =====\n");

/*
|--------------------------------------------------------------------------
| MD5 Hash ( Not Secure - Avoid in Production)
|--------------------------------------------------------------------------
| Same input always gives the same output.
| It is very fast, which makes brute-force and rainbow table attacks easier.
*/
const input1 = "password1234";

const md5Hash1 = crypto.createHash("md5").update(input1).digest("hex");
const md5Hash2 = crypto.createHash("md5").update(input1).digest("hex");

console.log("Input:", input1);
console.log("MD5 Hash 1:", md5Hash1);
console.log("MD5 Hash 2:", md5Hash2);
console.log("Same hash?", md5Hash1 === md5Hash2);

console.log("\n" + "-".repeat(50) + "\n");

/*
|--------------------------------------------------------------------------
| SHA-256 Hash (Better, but still not ideal for passwords)
|--------------------------------------------------------------------------
| More secure than MD5.
| Output length is 256-bit.
*/
const input2 = "password12345";

const sha256Hash = crypto.createHash("sha256").update(input2).digest("hex");

console.log("Input:", input2);
console.log("SHA-256 Hash:", sha256Hash);

console.log("\n" + "-".repeat(50) + "\n");

/*
|--------------------------------------------------------------------------
| SHA-512 Hash (Stronger than SHA-256)
|--------------------------------------------------------------------------
| Output length is 512-bit.
*/
const sha512Hash = crypto.createHash("sha512").update(input2).digest("hex");

console.log("Input:", input2);
console.log("SHA-512 Hash:", sha512Hash);

console.log("\n" + "-".repeat(50) + "\n");

/*
|--------------------------------------------------------------------------
| Extra Math Example
|--------------------------------------------------------------------------
| 2^32 ≈ 4.29 billion
*/
const result = 2 ** 32 / 10 ** 9;

console.log("2^32 / 10^9 =", result);
