"use strict";
// parameter properties
class Animal {
    constructor(name, species, sound) {
        this.name = name;
        this.species = species;
        this.sound = sound;
    }
}
const dog = new Animal("dog", "dog", "bark");
console.log(dog.name);
