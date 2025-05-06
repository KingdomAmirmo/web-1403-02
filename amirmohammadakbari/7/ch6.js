const { createFile } = require('./ch2-createFile');
const { openFile, openFolder } = require('./ch3-open')
const { createRecord } = require('./ch4-createRecord');

const CommandController = require('./commandController');

const commandController = new CommandController();

commandController.addCommand('createFile', createFile);
commandController.addCommand('open', (filename) => {
    if (filename.includes('.')) {
        openFile(filename);
    } else {
        openFolder(filename);
    }
});

commandController.addCommand('createRecord', createRecord);

const args = process.argv.slice(2);
const command = args[0];


commandController.execute(command, ...args.slice(1));
