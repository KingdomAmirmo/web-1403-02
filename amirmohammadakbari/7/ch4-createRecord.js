const fs = require('fs');
const path = require('path');



function createRecord(name, lastname, email) {
    if (!name || !lastname || !email) {
        console.log("Please provide name, lastname, and email.");
        return;
    }

    const dbPath = path.join(__dirname, 'database.json');
    const newRecord = { name, lastname, email };

    fs.readFile(dbPath, 'utf8', (err, data) => {
        let records = [];

        if (!err) {
            try {
                records = JSON.parse(data).records || [];
            } catch (parseError) {
                console.error("Error parsing JSON:", parseError.message);
                return;
            }
        }

        records.push(newRecord);

        fs.writeFile(dbPath, JSON.stringify({ records }, null, 2), (err) => {
            if (err) {
                console.error("Error writing to file:", err.message);
                return;
            }
            console.log("Record created in database.");
        });
    });
}

module.exports = {
    createRecord
};
