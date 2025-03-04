let input = process.argv.slice(2);
let operation = input[0];
let numbers = input.slice(1)


if(operation === "Sum") {
    console.log(Number(numbers[0]) + Number(numbers[1]));
} else if(operation === "Minus") {
    console.log(Number(numbers[0]) - Number(numbers[1]));
}
 else {
    console.log("Invalid Command!!");
}


