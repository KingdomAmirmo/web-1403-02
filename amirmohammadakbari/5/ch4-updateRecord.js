const fs = require('fs');
const path = require('path');

const [name, lastname, email] = process.argv.slice(2);

if (!name || !lastname || !email) {
    console.log("Please provide name, lastname, and email.");
    process.exit(1);
}

const dbPath = path.join(__dirname, 'database.json');

fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err.message);
        return;
    }

    let records;
    try {
        records = JSON.parse(data).records || [];
    } catch (parseError) {
        console.error("Error parsing JSON:", parseError.message);
        return;
    }

    const recordIndex = records.findIndex(record => record.name === name);

    if (recordIndex === -1) {
        console.log("Record not found.");
        return;
    }

    records[recordIndex].lastname = lastname;
    records[recordIndex].email = email;

    fs.writeFile(dbPath, JSON.stringify({ records }, null, 2), (err) => {
        if (err) {
            console.error("Error writing to file:", err.message);
            return;
        }
        console.log("Record updated successfully.");
    });
});
