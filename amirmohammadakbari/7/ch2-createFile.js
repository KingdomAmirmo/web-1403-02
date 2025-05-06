const fs = require('fs');
const path = require('path');

function createFile(filename, content) {
    fs.writeFile(path.join(__dirname, filename), content, (err) => {
        if (err) {
            console.error('Error creating file:', err);
        } else {
            console.log(`File ${filename} created successfully.`);
        }
    });
}


module.exports = {
    createFile
};
