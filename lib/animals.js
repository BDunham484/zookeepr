const fs = require("fs");
const path = require("path");




function filterByQuery(query, aniamalsArray) {
    let personalityTraitsArray = [];
    //save animalsArray as filteredResults
    let filteredResults = aniamalsArray;
    if(query.personalityTraits) {
        if (typeof query.personalityTraits == 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        //loop through each trait in the personalityTraits array
        personalityTraitsArray.forEach(trait => {
            //check the trait against each animal in the filteredREsults array.
            
            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    };
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}





function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}





function createNewAnimal(body, animalsArray) {
    console.log(body)
    const animal = body;
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    return animal;
}





//validate incoming data
function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}





module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};