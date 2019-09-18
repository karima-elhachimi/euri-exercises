const sumLib = require('./main-node');
sumLib.sum();


for (var i = 0; i <= 5; i++) {
    //de functie kan ook eenvoudig buiten de for loop worden geinitialiseerd om in de timeout te gebruiken
    const logIndex = (i) => () => console.log(i);
    setTimeout(logIndex(i), i * 1000);
}

for(let i = 0; i <= 5; i++){
    setTimeout(()=> {
        console.log(i);
    }, i*1000);
}



/*
console.log(calc.sum(1, 2));
console.log(calc.sub(3, 2));

document.getElementById("myAddBtn").addEventListener("click", function () {
    //+
    const val1 = document.getElementById('val1').value;
    const val2 = document.getElementById('val2').value;
    const result = calc.sum(val1, val2);
    document.getElementById('myResult').innerHTML = result;
    console.log(result);
});

document.getElementById("mySubBtn").addEventListener("click", function () {
    const val1 = document.getElementById('val1').value;
    const val2 = document.getElementById('val2').value;
    const result = calc.sub(val1, val2);
    document.getElementById('myResult').innerHTML = result;
    console.log(result);
});
*/
