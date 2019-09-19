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

