"use strict";

window.addEventListener("DOMContentLoaded", start);

let allAnimals = [];
let filter;

// The prototype for all animals:
const Animal = {
    name: "",
    desc: "-unknown animal-",
    type: "",
    age: 0,
};

const allFilterButtons = document.querySelectorAll(`button.filter[data-action="filter"`);

function start() {
    console.log("start");

    loadJSON();

    // TODO: Add event-listeners to sort buttons

    // Add event-listeners to filter
    allFilterButtons.forEach((filterButton) => {
        filterButton.addEventListener("click", clickFilterButton);
    });
}

async function loadJSON() {
    console.log("loadJSON");
    const response = await fetch("animals.json");
    const jsonData = await response.json();

    // when loaded, prepare data objects
    prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
    console.log("prepareObjects");
    allAnimals = jsonData.map(prepareObject);

    displayList(allAnimals);
}

function prepareObject(jsonObject) {
    console.log("prepareObject");

    const animal = Object.create(Animal);

    const texts = jsonObject.fullname.split(" ");
    animal.name = texts[0];
    animal.desc = texts[2];
    animal.type = texts[3];
    animal.age = jsonObject.age;

    return animal;
}

function displayList(animals) {
    console.log("displayList");

    // clear the list
    document.querySelector("#list tbody").innerHTML = "";

    // build a new list
    animals.forEach(displayAnimal);
}

function displayAnimal(animal) {
    console.log("displayAnimal");

    // create clone
    const clone = document.querySelector("template#animal").content.cloneNode(true);

    // set clone data
    clone.querySelector("[data-field=name]").textContent = animal.name;
    clone.querySelector("[data-field=desc]").textContent = animal.desc;
    clone.querySelector("[data-field=type]").textContent = animal.type;
    clone.querySelector("[data-field=age]").textContent = animal.age;

    // append clone to list
    document.querySelector("#list tbody").appendChild(clone);
}

function clickFilterButton(event) {
    filter = event.target.dataset.filter;
    console.log(filter);

    const filteredAnimals = filterAnimals();
    console.log(filteredAnimals);
    displayList(filteredAnimals);
}

function filterAnimals() {
    console.log("filterAnimals");

    let filteredAnimals = [];

    switch (filter) {
        case "all":
            filteredAnimals = allAnimals.filter(isAll);
            break;
        case "cat":
            filteredAnimals = allAnimals.filter(isCat);
            break;
        case "dog":
            filteredAnimals = allAnimals.filter(isDog);
            break;
        default:
            console.log("I don't know this animal :(");
    }

    console.log(filteredAnimals);
    return filteredAnimals;
}

function isCat(animal) {
    console.log("isCat");
    if (animal.type === "cat") {
        return true;
    } else {
        return false;
    }
}

function isDog(animal) {
    console.log("isDog");
    if (animal.type === "dog") {
        return true;
    } else {
        return false;
    }
}

function isAll(animal) {
    console.log("isAll");
    return true;
}
