let input = process.argv.slice(2);
let operation = input[0];
let numbers = input.slice(1)


if (operation === "Sum") {
    console.log(Number(numbers[0]) + Number(numbers[1]));
} else if (operation === "Minus") {
    console.log(Number(numbers[0]) - Number(numbers[1]));
} else if (operation === "Print") {
    let user = {
        name: "Amir",
        last_name: "Akbari",
        email: "amir@yahoo.com"
    }
    for(let key in user) {
        console.log("Salam" + ' ' + user[key]);
    }
} else {
    console.log("Invalid Command!!");
}


