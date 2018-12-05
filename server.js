'use strict';
require('dotenv').config();
const express = require('express');
const session = require('express-session');

const mongo = require('mongodb').MongoClient;
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

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
  
    app.route('/auth/github').get((req, res) => {
        passport.authenticate('github');
    });

    app.route("/auth/github/callback").get(passport.authenticate("github", {failureRedirect: "/"}), (req, res) => {
                res.redirect("/profile");
            });
  
  const secObj = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://passport-fcc-proj-nastex21.glitch.me/auth/github/callback'
  }
  
  passport.use(new GitHubStrategy(secObj, function(accessToken, refreshToken, profile, cb){
     console.log(profile);
    
  }));
  
    auth(app, db);
    routes(app, db);

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });
  });