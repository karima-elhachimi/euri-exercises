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

//Animal2.prototype.makeSound = function(){
//    console.log("We don't make sound anymore.");
//}

dog.makeSound();


class Cat extends Animal2 {
    constructor(sound, fur){
        super(sound);
        this.fur = fur
    }

    brushFur(){
        console.log(`Brush ${this.fur}`);
    }
}

const ragDoll = new Cat("mowr", "long haired fur");

ragDoll.makeSound();
ragDoll.brushFur();


