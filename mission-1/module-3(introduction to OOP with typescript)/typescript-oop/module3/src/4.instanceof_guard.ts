{
  class Animal {
    name: string;
    species: string;
    constructor(name: string, species: string) {
      this.name = name;
      this.species = species;
    }
    makeSound() {
      console.log("The animal makes a sound");
    }
  }

  class Dog extends Animal {
    constructor(name: string, species: string) {
      super(name, species);
    }
    makeBark() {
      console.log("The dog barks");
    }
  }

  class Cat extends Animal {
    constructor(name: string, species: string) {
      super(name, species);
    }
    makeMeow() {
      console.log("The cat meows");
    }
  }

  const dog = new Dog("German Shepherd", "dog");
  const cat = new Cat("Persian", "cat");

  // smart way to handle instanceof
  const getDog = (animal: Animal): animal is Dog => {
    return animal instanceof Dog;
  };

  const getCat = (animal: Animal): animal is Cat => {
    return animal instanceof Cat;
  };

  const getAnimal = (animal: Animal) => {
    if (getDog(animal)) {
      animal.makeBark();
    } else if (getCat(animal)) {
      animal.makeMeow();
    } else {
      animal.makeSound();
    }
  };

  getAnimal(cat);
}
