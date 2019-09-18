function identify(arg1){
    return arg1;
}

console.log(identify(3));


function sum(a, b ){
    return a+b;
}

function mul(a, b){
    return a*b;
}

console.log(`sum: ${sum(1,2)} mul: ${mul(1,2)}`);

function returnFunction(y){
    return function(){
        return y;
    }
    
}

const returnedFunction = returnFunction(3);
console.log(` return function ${returnedFunction()}`);