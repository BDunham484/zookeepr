//import required packages
const express = require('express');
const fs = require('fs');
const path = require('path');
//route that front-end can request data from
const { animals } = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//set environment variable
const PORT = process.env.PORT || 3001;
//instantiate the server
const app = express();





// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

//make all files in public directory static resources
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);





app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
