// Step 1
myForEach([0, 1, 2], function (value, index) {
    console.log(value, index, this[index] == value /* should be true */);
});

function myForEach(arr, callback) {
    for(let i = 0; i < arr.length; i++){    
       callback.call(arr, arr[i], i);
    }
}

/*
Array.prototype.myForEach = function(){
    for(let i = 0; i < this.length; i++){
        console.log(i);
        return i;
    }
};
*/
Array.prototype.myForEach = function(fn){
    myForEach(this, fn)
}; 

// Step 2 - Make this work
//const myArr = [2, 3, 4];
[2, 3, 4].myForEach(function (value) {
    console.log(value);
});


