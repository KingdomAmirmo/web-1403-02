const fs = require('fs');
const path = require('path');


function openFile(filename) {
    fs.readFile(path.join(__dirname, filename), 'utf8', (err, data) => {
        if (err) {
            console.error('Error opening file:', err);
        } else {
            console.log(`Contents of ${filename}:`);
            console.log(data);
        }
    });
}

function openFolder(foldername) {
    fs.readdir(path.join(__dirname, foldername), (err, files) => {
        if (err) {
            console.error('Error opening folder:', err);
        } else {
            console.log(`Files in ${foldername}:`);
            files.forEach(file => {
                console.log(file);
            });
        }
    });
}


module.exports = {
    openFile,
    openFolder
};
