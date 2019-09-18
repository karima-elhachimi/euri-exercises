const calc = (function(){
  
  function sum(a, b) {
    return +a + +b;
  }

  function sub(a, b) {
    return +a - +b;
  }
  function divide(a, b) {
    return +a/+b;
  
  }
  return {
    sum: sum,
    sub: sub
  }
})();

