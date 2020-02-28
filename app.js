const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const voting = require('./routes/voting');

//public folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(cors());

//for vote url to votingjs file
app.use('/vote', voting);

app.listen(3000, ()=>{
    console.log('dtoolz server working');
});