let input = process.argv.slice(3);
let command = process.argv[2];
let controllers = [];

function start() {
    for (let item of controllers) {
        if (item.command === command) {
            item.function(input);
        }
    }
}

function use(name, func) {
    let item = {
        command: name,
        function: func
    }
    controllers.push(item)
}

export {
    start,
    use
}


