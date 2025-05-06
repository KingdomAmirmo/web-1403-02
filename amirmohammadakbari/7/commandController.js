class CommandController {
    constructor() {
        this.commands = [];
    }

    addCommand(name, action) {
        this.commands.push({ name, action });
    }

    execute(commandName, ...args) {
        const command = this.commands.find(cmd => cmd.name === commandName);
        if (command) {
            command.action(...args);
        } else {
            console.log(`Unknown command: ${commandName}`);
        }
    }
}

module.exports = CommandController;
