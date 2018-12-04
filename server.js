'use strict';
require('dotenv').config()
const express     = require('express');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');

const app = express();

fccTesting(app); //For FCC testing purposes
app.set('view engine', 'pug');


app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json);

app.route('/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
