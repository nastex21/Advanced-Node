'use strict';
require('dotenv').config();
const express = require('express');
const session = require('express-session');

const mongo = require('mongodb').MongoClient;
const passport = require('passport');

const routes = require('./Routes');
const auth = require('./Auth');

const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.set('view engine', 'pug');
fccTesting(app); //For FCC testing purposes

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());


mongo.connect(process.env.MONGO_URI, (err, client) => {
  var db = client.db('user-db');
  if (err) {
    console.log('Database error: ' + err);
  } else {
    console.log('Successful database connection');
  }
    auth(app, db);
    routes(app, db);

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  });