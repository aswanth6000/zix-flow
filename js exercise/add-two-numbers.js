function addTwoNumbers(num1, num2){
    //checking if both inputs are numbers
    if(typeof num1 !== 'number' || typeof num2 !== 'number'){
        throw new Error("Error: Both inputs must be numbers");
    }
    //Return the sum of two numbers
    return num1 + num2;
}

// Example usage

try {
    const result = addTwoNumbers(5, 10);
    console.log(result); // Output will not be printed in the console
} catch (error) {
    console.error(error.message);
}