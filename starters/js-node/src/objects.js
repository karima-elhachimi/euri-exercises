const animal = Object.create(null);
animal.eats = function(food){
    console.log(`I eat ${food}`);
}

const rabbit = Object.create(animal);
rabbit.jumps = function(hops) {
    for(let i = 0; i < hops; i++){
        console.log("hop");
    }
}

rabbit.eats("grass");
rabbit.jumps(3);

//constructor

function Animal1(){
    this.eats = function(food){
        console.log(`I eat ${food}`);
    }
}

const cat = new Animal1();
cat.eats("fish");
cat.meows = function(meows){
    for(let i = 0; i < meows; i++){
        console.log("meow");
    }
}

cat.meows(4);

//class

class Animal2 {

    sound;
    constructor(sound){
        this.sound = sound;
    }

    makeSound(){
        console.log(`I ${this.sound}`);
    }
}

const dog = new Animal2("bark");

dog.speak = function(barks){
    for(let i = 0; i < barks; i++){
        console.log(this.sound);
    }
}

dog.makeSound();

dog.speak(2);



