const fs = require('fs');
const path = require('path');

const name = process.argv[2];

if (!name) {
    console.log("Please provide a filename or folder name.");
    process.exit(1);
}

const filePath = path.join(__dirname, name);

fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error("Error:", err.message);
        return;
    }

    if (stats.isFile()) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error("Error reading file:", err.message);
                return;
            }
            console.log("File Contents:\n", data);
        });
    } else if (stats.isDirectory()) {
        fs.readdir(filePath, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err.message);
                return;
            }
            console.log("Directory Contents:\n", files.join('\n'));
        });
    } else {
        console.log("The specified path is neither a file nor a directory.");
    }
});
