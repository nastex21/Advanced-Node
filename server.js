'use strict';
require('dotenv').config();
const express     = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');

const fccTesting  = require('./freeCodeCamp/fcctesting.js');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'pug');
fccTesting(app); //For FCC testing purposes
app.use('/public', express.static(process.cwd() + '/public'));

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.route('/')
  .get((req, res) => {
    res.render(process.cwd() + '/views/pug/index', {title: 'Hello', message: 'Please login'})
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
