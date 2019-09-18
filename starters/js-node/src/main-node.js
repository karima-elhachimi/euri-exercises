function sum(){ 
    const num1 = process.argv[2];
    const num2 = process.argv[3];
    const result = +num1 + +num2;
    console.log(result);
}

module.exports = {
    sum: sum
}