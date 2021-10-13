const express = require('express');
const app = express();
const students = require('./routes/students');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/landingPage') 
    .then(() => console.log('Connected to mongoDb.'))
    .catch((e) => console.error('Could not connect to mongoDb.', e));

app.use(express.json());
app.use('/api/students', students);

//listen on port
let port = 1000;
app.listen(port, () => {
    console.log('Listen on port ' + port);
});