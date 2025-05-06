const fs = require('fs');

const [name, body] = process.argv.slice(2);

if (!name || !body) {
    console.log("Please enter both a filename and content.");
    process.exit(1);
}

fs.writeFile(name, body, (err) => {
    if (err) {
        console.error("Error while creating file:", err);
        return;
    }
    console.log("File Created.");
});
