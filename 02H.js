const fs = require('fs')

let input = process.argv.slice(2);
let operation = input[0];
// let numbers = input.slice(1)
let inputs = input.slice(1)

if (operation === "Sum") {
    console.log(Number(numbers[0]) + Number(numbers[1]));
} else if (operation === "Minus") {
    console.log(Number(numbers[0]) - Number(numbers[1]));
} else if (operation === "Print") {
    let user = {
        name: inputs[0],
        last_name: inputs[1],
        email: inputs[2]
    }
    for (let key in user) {
        console.log("Salam" + ' ' + user[key]);
    }
} else if (operation === "Write") {
    let user = {
        name: inputs[0],
        last_name: inputs[1],
        email: inputs[2]
    }
    fs.writeFile('./data.json', JSON.stringify(user), function (err, data) {
        if (err) {
            throw err;
        } else {
            console.log("Done :))");
        }
    });
} else if (operation === "Create") {
    let readData = fs.readFile('./data.json', 'utf8', (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        let allData = JSON.parse(result);
        allData.data.push({
            name: inputs[0],
            last_name: inputs[1],
            email: inputs[2]
        });

        let writedData = fs.writeFile('./data.json', JSON.stringify(allData), function(err, result) {
            if (err) {
                throw err;
            }
            else{
                console.log("Done! :))");
            }
        });
    });

 



    // fs.writeFile('./data.json', JSON.stringify(user), function (err, data) {
    //     if (err) {
    //         throw err;
    //     } else {
    //         console.log("Done :))");
    //     }
    // });
} else {
    console.log("Invalid Command!!");
}


