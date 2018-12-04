'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local');

const fccTesting = require('./freeCodeCamp/fcctesting.js');
app.use(express.urlencoded({
  extended: true
}));
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

mongo.connect(process.env.MONGO_URI, (err, db) => {
  if (err) {
    console.log('Database error: ' + err);
  } else {
    console.log('Successful database connection');

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
      db.collection('users').findOne({
          _id: new ObjectID(id)
        },
        (err, doc) => {
          done(null, doc);
        }
      );
    });

    passport.use(new LocalStrategy(
      function (username, password, done) {
        db.collection('users').findOne({
          username: username
        }, function (err, user) {
          console.log('User ' + username + ' attempted to log in.');
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false);
          }
          if (password !== user.password) {
            return done(null, false);
          }
          return done(null, user);
        });
      }
    ));

    app.route('/login').post(passport.authenticate('local', {
      failureRedirect: '/'
    }), (req, res) => {
      res.redirect('/profile');
    })

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });

  }
});

app.route('/')
  .get((req, res) => {
    res.render(process.cwd() + '/views/pug/index', {
      title: 'Hello',
      message: 'Please login'
    })
  });