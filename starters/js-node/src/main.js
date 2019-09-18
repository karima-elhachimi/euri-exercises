
console.log(calc.sum(1, 2));
console.log(calc.sub(3, 2));

document.getElementById("myAddBtn").addEventListener("click", function () {
    //+ 
    const val1 = parseInt(document.getElementById('val1').value);
    const val2 = parseInt(document.getElementById('val2').value);
    const result = calc.sum(val1, val2);
    document.getElementById('myResult').innerHTML = result;
    console.log(result);
});

document.getElementById("mySubBtn").addEventListener("click", function () {
    const val1 = parseInt(document.getElementById('val1').value, 10);
    const val2 = parseInt(document.getElementById('val2').value, 10);
    const result = calc.sub(val1, val2);
    document.getElementById('myResult').innerHTML = result;
    console.log(result);
});
