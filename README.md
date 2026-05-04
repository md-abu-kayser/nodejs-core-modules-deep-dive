# Node.js Core Modules Deep Dive: Practical Examples and Best Practices

[![Node.js Version](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/md-abu-kayser/nodejs-core-modules-deep-dive?style=social)](https://github.com/md-abu-kayser/nodejs-core-modules-deep-dive)

A comprehensive exploration of Node.js core modules, demonstrating advanced file system operations, path manipulation, system information retrieval, cryptographic functions, and secure configuration management. This project serves as both a learning resource and a showcase of best practices in Node.js development.

## 🚀 Features

- **File System Mastery**: Synchronous and asynchronous file reading, writing, appending, and deletion with error handling
- **Path Manipulation**: Cross-platform path operations using the `path` module
- **File Organization CLI**: Automated file categorization and organization tool
- **System Monitoring**: OS-level information retrieval for performance monitoring
- **Cryptographic Operations**: Secure hashing and encryption/decryption implementations
- **Configuration Management**: Environment-based configuration with dotenv integration
- **Production-Ready Code**: Emphasis on async patterns, error handling, and security best practices
- **Educational Content**: Detailed explanations and interview preparation insights

## 📋 Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Topics Covered](#topics-covered)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## 🛠 Installation

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Setup

```bash
# Clone the repository
git clone https://github.com/md-abu-kayser/nodejs-core-modules-deep-dive.git

# Navigate to the project directory
cd nodejs-core-modules-deep-dive

# Install dependencies
npm install

# Create environment file (optional, for config demo)
echo "APP_NAME=NodeCoreDeepDive" > .env
echo "APP_VERSION=1.0.0" >> .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env
```

## 🎯 Usage

Each module demonstration can be run independently:

```bash
# File reading examples
node read-async.js
node read-sync.js

# File writing and appending
node write-file.js
node sync-append-file.js
node async-append-file.js

# File deletion
node delete-file.js

# Path operations
node path-basic.js

# File organizer CLI
node file-organizer.js

# OS information
node os-basic.js

# Cryptographic functions
node hashing.js
node encryption.js

# Configuration management
node config.js
```

### Running the File Organizer

```bash
# Initialize directories and test files
# (Modify file-organizer.js to call initializeDirectories())

# Organize files
node file-organizer.js
```

## 📁 Project Structure

```
nodejs-core-modules-deep-dive/
├── data/
│   ├── diary.txt
│   ├── user.json
│   └── entries/
│       ├── entry1.txt
│       ├── entry2.txt
│       └── entry3.txt
├── output/
│   ├── test-async.txt
│   ├── test-sync.txt
│   ├── messy-files/
│   │   ├── app.py
│   │   ├── data.csv
│   │   ├── notes.txt
│   │   └── random.xyz
│   └── organized/
│       ├── archives/
│       ├── audio/
│       ├── code/
│       ├── documents/
│       ├── images/
│       ├── others/
│       ├── spreadsheets/
│       └── videos/
├── DEEP_DIVE.md          # Detailed explanations and code analysis
├── README.md             # This file
├── package.json
├── LICENSE
├── read-async.js         # Asynchronous file reading
├── read-sync.js          # Synchronous file reading
├── write-file.js         # File writing operations
├── sync-append-file.js   # Synchronous file appending
├── async-append-file.js  # Asynchronous file appending
├── delete-file.js        # File deletion operations
├── path-basic.js         # Path module demonstrations
├── file-organizer.js     # CLI file organization tool
├── os-basic.js           # OS module usage
├── hashing.js            # Cryptographic hashing
├── encryption.js         # Data encryption/decryption
├── config.js             # Configuration with dotenv
└── greetings.js          # Additional utility (if applicable)
```

## 📚 Topics Covered

| Module        | Topic                  | Key Concepts                            |
| ------------- | ---------------------- | --------------------------------------- |
| **fs**        | File Reading           | Sync vs Async, Error Handling, Encoding |
| **fs**        | File Writing/Appending | Atomic Operations, Concurrency, Logging |
| **fs**        | File Deletion          | Safe Deletion, Directory Operations     |
| **path**      | Path Manipulation      | Cross-Platform Paths, Path Parsing      |
| **fs + path** | File Organizer CLI     | Automation, File Categorization         |
| **os**        | System Information     | Hardware Monitoring, Platform Detection |
| **crypto**    | Hashing                | Integrity Checks, Security Algorithms   |
| **crypto**    | Encryption             | Data Protection, Symmetric Encryption   |
| **dotenv**    | Configuration          | Environment Variables, Secure Config    |

## 💡 Examples

### Asynchronous File Reading

```javascript
const fs = require("fs");

fs.readFile("./data/diary.txt", "utf-8", (error, data) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("File content:", data);
});

console.log("Non-blocking operation continues...");
```

### Secure Data Encryption

```javascript
const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return { iv: iv.toString("hex"), encryptedData: encrypted };
}

// Usage
const sensitiveData = "Confidential information";
const encrypted = encrypt(sensitiveData);
console.log("Encrypted:", encrypted);
```

### File Organization Automation

```javascript
const fs = require("fs");
const path = require("path");

const categories = {
  images: [".jpg", ".png"],
  documents: [".pdf", ".txt"],
  code: [".js", ".py"],
};

function organizeFiles(sourceDir, destDir) {
  const files = fs.readdirSync(sourceDir);
  files.forEach((file) => {
    const ext = path.extname(file).toLowerCase();
    const category =
      Object.keys(categories).find((cat) => categories[cat].includes(ext)) ||
      "others";

    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, category, file);

    fs.renameSync(sourcePath, destPath);
  });
}
```

## 🎓 Learning Outcomes

- Master Node.js core modules for robust backend development
- Implement secure file operations and data protection
- Build CLI tools for automation and productivity
- Understand performance implications of sync vs async operations
- Apply best practices for configuration and environment management
- Prepare for technical interviews with in-depth module knowledge

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow ESLint configuration for code style
- Add tests for new features
- Update documentation for API changes
- Ensure cross-platform compatibility

## 📄 License

- This project is licensed under the terms of the **[MIT License](./LICENSE)**.
- You may replace or update the license as needed for client or proprietary projects.

## 👨‍💻 Author

**Your Name**

- GitHub: [@md-abu-kayser](https://github.com/md-abu-kayser)
- Email: abu.kayser.official@gmail.com

---

⭐ **Star this repo if you found it helpful!** ⭐

_Built with ❤️ using Node.js core modules_
