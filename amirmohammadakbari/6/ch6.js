

const { createFile } = require('./ch2-createFile');
const { openFile, openFolder } = require('./ch3-open')
const { createRecord } = require('./ch4-createRecord');

module.exports = {
    createFile,
    openFile,
    openFolder,
    createRecord
};

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'createFile':
        createFile(args[1], args[2]);
        break;
    case 'open':
        if (args[1].includes('.')) {
            openFile(args[1]);
        } else {
            openFolder(args[1]);
        }
        break;
    case 'createRecord':
        createRecord(args[1], args[2], args[3]); 
        break;
    default:
        console.log('Unknown command');
}
