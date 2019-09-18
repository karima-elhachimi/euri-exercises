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


const addf = function(arg1){
    return function(arg2){
        return arg1+arg2;

    }
}

addf(1)(2);

console.log(`addf: ${addf(2)(4)}`);

function applyf(fun){
    return function(a){
        return function(b){
            return fun(a, b);
        }
    };
}

console.log(`tripple call: ${applyf(sum)(2)(3)}`);

function curry(fun, x){
    return function(y){
        return fun(x, y);
    }

}

console.log(`curry: ${curry(sum, 2)(3)}`);


const inc = curry(sum, 1)

console.log(`inc: ${inc(inc(5))}`);



