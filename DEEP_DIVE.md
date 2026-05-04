# Deep Dive into Node.js Core Modules

Below, I'll explain and explore each topic from your list, including code examples from your files, interview preparation tips, and ways to impress clients with deep knowledge and practical applications.

## 1. Reading Files with the fs Module

### Explanation

The `fs` (File System) module in Node.js provides APIs for interacting with the file system. Reading files can be done synchronously (blocking) or asynchronously (non-blocking). Asynchronous methods are preferred in production to avoid blocking the event loop, which could degrade performance in I/O-intensive applications.

- **Synchronous Reading**: Uses `fs.readFileSync()`, which blocks execution until the file is read.
- **Asynchronous Reading**: Uses `fs.readFile()` with a callback, allowing other operations to continue.

Key considerations: Error handling is crucial, as files might not exist or permissions might be denied. Always specify encoding (e.g., 'utf-8') for text files.

### Code Examples

**Asynchronous Reading** (from `read-async.js`):

```javascript
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
```

**Synchronous Reading** (from `read-sync.js`):

```javascript
const fs = require("fs");

try {
  const data = fs.readFileSync("./data/diary.txt", "utf-8");
  console.log("File Statement:");
  console.log(data);
} catch (err) {
  console.error(err.message);
}

console.log("Finished");
```

### Interview Preparation

- **Common Questions**: Explain the difference between sync and async file operations. Why is async preferred? Discuss event loop blocking.
- **Best Practices**: Mention using promises with `fs/promises` for cleaner async code. Know about streams for large files (`fs.createReadStream`).
- **Edge Cases**: Handling ENOENT errors, encoding issues, and large file performance.

### Impressing Clients

Demonstrate understanding of performance implications: "In high-traffic apps, async file reads prevent thread blocking, ensuring scalability. For example, reading user logs asynchronously allows concurrent requests without delays." Show benchmarks or discuss integrating with streams for real-time data processing.

## 2. Writing and Appending Files with the fs Module

### Explanation

Writing files creates or overwrites content, while appending adds to existing files. Both have sync and async versions. Appending is useful for logs or incremental data storage. Always handle errors, as disk space or permissions can fail operations.

- **Writing**: `fs.writeFileSync()` / `fs.writeFile()`
- **Appending**: `fs.appendFileSync()` / `fs.appendFile()`

Appending is atomic in some cases, making it safer for concurrent writes.

### Code Examples

**Writing Files** (from `write-file.js`):

```javascript
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
```

**Synchronous Appending** (from `sync-append-file.js`):

```javascript
const fs = require("fs");

// fs.writeFileSync("./output/app.log", "Application Started\n");
// console.log("file created");

const logEntry1 = `${new Date().toISOString()} user logged in\n`;
fs.appendFileSync("./output/app.log", logEntry1);

const logEntry2 = `${new Date().toISOString()} data fetched\n`;
fs.appendFileSync("./output/app.log", logEntry2);
console.log("task completed");

// --------------------------------------------------
// use function
function logMessage(message) {
  const logEntry = `${new Date().toISOString()} ${message}\n`;

  try {
    fs.appendFileSync("./output/app.log", logEntry);
    console.log("Log saved");
  } catch (error) {
    console.error("Logging failed:", error.message);
  }
}

logMessage("user logged in");
logMessage("password matched");
logMessage("token generated");
```

**Asynchronous Appending** (from `async-append-file.js`):

```javascript
const fs = require("fs");

function logMessage(message) {
  const logEntry = `${new Date().toISOString()} ${message}\n`;
  fs.appendFile("./output/app.log", logEntry, (error) => {
    if (error) {
      console.error("Logging failed:", error.message);
      return;
    }
    console.log("Log saved");
  });
}

logMessage("user logged in");
logMessage("password matched");
logMessage("token generated");
```

### Interview Preparation

- **Questions**: When to use append vs. write? Discuss atomicity in appending. How to handle concurrent writes?
- **Tips**: Know about `fs/promises` for promise-based APIs. Mention flags like 'a' for appending in streams.

### Impressing Clients

Highlight reliability: "Appending logs asynchronously ensures no data loss during high concurrency, critical for audit trails in financial apps." Propose custom logging utilities with timestamps and error recovery.

## 3. Deleting Files with the fs Module

### Explanation

Deleting files uses `fs.unlinkSync()` or `fs.unlink()`. Always check if the file exists first to avoid errors. Deletion is permanent and not recoverable, so use cautiously. For directories, use `fs.rmdir()` or `fs.rm()` (Node 14+).

### Code Example (from `delete-file.js`):

```javascript
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
```

### Interview Preparation

- **Questions**: How to safely delete files? What about recursive directory deletion?
- **Tips**: Discuss `fs.rm()` for modern APIs. Mention security risks of arbitrary deletion.

### Impressing Clients

Emphasize safety: "Implement checks and backups before deletion to prevent data loss, as seen in cleanup scripts for temp files in cloud storage apps."

## 4. Introduction to the path Module

### Explanation

The `path` module handles file and directory paths, providing cross-platform compatibility (Windows vs. Unix). Key functions: `path.join()`, `path.dirname()`, `path.basename()`, `path.extname()`, `path.parse()`, `path.format()`.

It's essential for building robust paths without hardcoding separators.

### Code Example (from `path-basic.js`):

```javascript
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
```

### Interview Preparation

- **Questions**: How does `path.join()` prevent path traversal attacks? Differences between `path.resolve()` and `path.join()`?
- **Tips**: Know `__dirname` and `__filename`. Discuss Windows backslashes vs. Unix forward slashes.

### Impressing Clients

Show portability: "Using `path.join()` ensures apps work on any OS, avoiding deployment issues in multi-platform environments like Docker containers."

## 5 & 6. Building a Simple File Organizer CLI (Parts 1 & 2)

### Explanation

This combines `fs` and `path` to organize files by extension into categories. Part 1 likely sets up directories and categorization logic; Part 2 handles moving files. Demonstrates practical file system manipulation for automation.

### Code Example (from `file-organizer.js`):

```javascript
const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "output", "messy-files");
const organizedDir = path.join(__dirname, "output", "organized");

const categories = {
  images: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg"],
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  videos: [".mp4", ".avi", ".mkv", ".mov", ".wmv"],
  audio: [".mp3", ".wav", ".flac", ".aac", ".ogg"],
  code: [".js", ".py", ".java", ".cpp", ".html", ".css"],
  archives: [".zip", ".rar", ".tar", ".gz", ".7z"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  others: [],
};

const testFiles = [
  "vacation.jpg",
  "report.pdf",
  "presentation.pptx",
  "music.mp3",
  "video.mp4",
  "script.js",
  "data.csv",
  "archive.zip",
  "photo.png",
  "notes.txt",
  "app.py",
  "movie.avi",
  "song.wav",
  "backup.tar.gz",
  "random.xyz",
  "nodejs.zip",
];

function initializeDirectories() {
  if (!fs.existsSync(sourceDir)) {
    fs.mkdirSync(sourceDir, { recursive: true });

    testFiles.forEach((file) => {
      fs.writeFileSync(path.join(sourceDir, file), `Content of ${file}`);
    });

    console.log("Messy directory created.");
  }

  if (!fs.existsSync(organizedDir)) {
    fs.mkdirSync(organizedDir, { recursive: true });
  }

  Object.keys(categories).forEach((category) => {
    const categoryPath = path.join(organizedDir, category);

    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }
  });

  console.log("Organized directory created.");
}

function getCategory(filename) {
  const ext = path.extname(filename).toLowerCase();

  for (const [category, extensions] of Object.entries(categories)) {
    if (extensions.includes(ext)) {
      return category;
    }
  }

  return "others";
}

function organizeFiles() {
  console.log("File organizer");
  console.log("Source:", sourceDir);
  console.log("Destination:", organizedDir);
  console.log("-".repeat(50));

  if (!fs.existsSync(sourceDir)) {
    console.log("Source directory does not exist. Run init first.");
    return;
  }

  const files = fs.readdirSync(sourceDir);

  if (files.length === 0) {
    console.log("No files to organize.");
    return;
  }

  const stats = {
    total: 0,
    byCategory: {},
  };

  files.forEach((file) => {
    const sourcePath = path.join(sourceDir, file);
    const stat = fs.statSync(sourcePath);
```

(The code is truncated; it continues with moving files and stats.)

### Interview Preparation

- **Questions**: How to handle file conflicts during move? Scalability for large directories?
- **Tips**: Discuss using streams for large files. Mention CLI argument parsing with `process.argv`.

### Impressing Clients

Demonstrate automation: "This CLI can organize thousands of files in seconds, saving hours in data management for content-heavy apps like media libraries."

## 7. Introduction to OS Module

### Explanation

The `os` module provides OS-related utilities: platform info, CPU details, memory stats, uptime. Useful for system monitoring, logging, or adaptive behavior based on hardware.

### Code Example (from `os-basic.js`):

```javascript
const os = require("os");

console.log("System info: \n");
console.log("-".repeat(50));

console.log("Platform Details :");
console.log("Platform :", os.platform());
console.log("Architecture :", os.arch());
console.log("OS type :", os.type());
console.log("OS release : ", os.release());
console.log("Hostname :", os.hostname());

console.log("-".repeat(50));

console.log("\nCUP info :");
const cpus = os.cpus();
console.log("CPU Model :", cpus[0].model);
console.log("Number of cores :", cpus.length);
console.log("CPU speed :", cpus[0].speed);

console.log("-".repeat(50));

const totalMem = os.totalmem();
const freeMem = os.freemem();
console.log("Total memory :", (totalMem / 1024 / 1024 / 1024).toFixed(2), "GB");
console.log("Free memory :", (freeMem / 1024 / 1024 / 1024).toFixed(2), "GB");

console.log("-".repeat(50));

const uptime = os.uptime();
const days = Math.floor(uptime / 86400);
const hours = Math.floor((uptime % 86400) / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
console.log(`${days} days ${hours} hours ${minutes} minutes`);
```

### Interview Preparation

- **Questions**: How to get system load? Differences between `os.platform()` and `process.platform`?
- **Tips**: Know about `os.homedir()`, `os.tmpdir()` for paths.

### Impressing Clients

Show monitoring: "Integrating OS stats into dashboards helps predict server issues, improving uptime for enterprise apps."

## 8. Hashing Data with the crypto Module

### Explanation

Hashing creates fixed-size digests from data, used for integrity checks, not encryption. Algorithms like MD5 (insecure), SHA-256, SHA-512. Hashing is one-way; same input always yields same hash.

### Code Example (from `hashing.js`):

```javascript
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
```

### Interview Preparation

- **Questions**: Why not use hashing for passwords? Explain salt and pepper. Compare HMAC.
- **Tips**: For passwords, use bcrypt or scrypt. Know about PBKDF2.

### Impressing Clients

Discuss security: "SHA-256 ensures data integrity in file transfers, preventing tampering in secure communications."

## 9. Encrypting and Decrypting Data with the crypto Module

### Explanation

Encryption protects data confidentiality using symmetric (shared key) or asymmetric (public/private keys) methods. Here, AES-256-CBC is symmetric. Requires key and IV (initialization vector) for security.

### Code Example (from `encryption.js`):

```javascript
const crypto = require("crypto");

const algorithm = "aes-256-cbc";

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
}

function decrypt(encryptedData, ivHex) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(ivHex, "hex"),
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

console.log("Encrypted Data : ");
const sensitiveData = "My credit card: 4242 4242 4242 4242";
console.log("original data : ", sensitiveData);

const encrypted = encrypt(sensitiveData);
console.log("Encrypted : ", encrypted);

console.log("Decrypted data : ");
const decrypted = decrypt(encrypted.encryptedData, encrypted.iv);
console.log("Decrypted : ", decrypted);
console.log("match : ", sensitiveData === decrypted);
```

### Interview Preparation

- **Questions**: Symmetric vs. asymmetric encryption? Why use IV? Risks of reusing keys?
- **Tips**: Know about TLS for transport encryption. Discuss key management.

### Impressing Clients

Highlight compliance: "AES encryption secures sensitive data like PII, meeting GDPR requirements for data protection in apps handling user info."

## 10. Using dotenv with Configuration

### Explanation

`dotenv` loads environment variables from a `.env` file, keeping secrets out of code. Combined with `process.env`, it manages config securely. Essential for different environments (dev/prod).

### Code Example (from `config.js`):

```javascript
require("dotenv").config();

const config = {
  app: {
    name: process.env.APP_NAME || "defaultAPP",
    version: process.env.APP_VERSION || "1.0.0",
    port: process.env.PORT || 8080,
    env: process.env.NODE_ENV,
  },
};

console.log(config.app);

module.exports = config;
```

### Interview Preparation

- **Questions**: How to handle missing env vars? Security of .env files?
- **Tips**: Never commit .env. Use validation libraries like joi.

### Impressing Clients

Show best practices: "dotenv enables secure config management, allowing seamless deployments across environments without code changes, crucial for CI/CD pipelines."

This covers all topics with explanations, code, prep tips, and client-focused insights. Let me know if you need expansions or runs!
