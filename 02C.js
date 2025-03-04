let input = process.argv.slice(2);
let operation = input[0];
let num1 = Number(input[1]);
let num2 = Number(input[2]);

if(operation === "Sum") {
    console.log(num1 + num2);
} else {
    console.log("Invalid Error!!");
}


