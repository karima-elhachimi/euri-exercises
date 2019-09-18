global.fullname = 'John Doe';

const obj = {
  fullname: 'Colin Ihrig',
  prop: {
    fullname: 'Aurelio De Rosa',
    getFullname: function(x, y) {
      return this.fullname;
    }
  }
};

const test = obj.prop.getFullname;
console.log(` initial: ${test()}`);

//context wordt gebind aan die van prop en vervolgens geroepen met deze gebinde context
const fixed1 = obj.prop.getFullname.bind(obj.prop);
console.log(` fixed1: ${fixed1()}`);
//functie wordt opgeroepen met een context 
console.log(`fixed2: ${obj.prop.getFullname.call(obj.prop)}`)
//functie wordt uitgevoerd met de context vvan prop
console.log(`fixed3: ${obj.prop.getFullname()}`)


