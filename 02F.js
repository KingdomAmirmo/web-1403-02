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
    for(let key in user) {
        console.log("Salam" + ' ' + user[key]);
    }
} else {
    console.log("Invalid Command!!");
}


