//import required package
const express = require('express');
//instantiate the server
const app = express();
//route that front-end can request data from
const { animals } = require('./data/animals');





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



app.get('/api/animals', (req, res) => {
    let results = animals;
    console.log(req.query)
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});



app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
