//import required packages
const express = require('express');
const fs = require('fs');
const path = require('path');


//set environment variable
const PORT = process.env.PORT || 3001;
//instantiate the server
const app = express();
//route that front-end can request data from
const { animals } = require('./data/animals');





//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());





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
        path.join(__dirname, './data/animals.json'),
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
    if (!animal.det || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}




app.get('/api/animals', (req, res) => {
    let results = animals;
    console.log(req.query)
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});





app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    }
});





app.post('/api/animals', (req, res) => {
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    //if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        //add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);
    //req.body is where our incoming content wil be
    // console.log(req.body);
    // res.json(req.body);
    res.json(animal);
    }
    
});



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
