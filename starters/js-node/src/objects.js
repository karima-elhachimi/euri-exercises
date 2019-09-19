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

function Animal(){
    this.eats = function(food){
        console.log(`I eat ${food}`);
    }
}

const cat = new Animal();
cat.eats("fish");
cat.meows = function(meows){
    for(let i = 0; i < meows; i++){
        console.log("meow");
    }
}

cat.meows(4);


