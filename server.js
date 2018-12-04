'use strict';
require('dotenv').config();
const express = require('express');

const session = require('express-session');
const passport = require('passport');
const mongo = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const LocalStrategy = require('passport-local');

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

    function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/');
    };

    app.route('/')
      .get((req, res) => {
        res.render(process.cwd() + '/views/pug/index', {
          title: 'Hello',
          message: 'Please login',
          showLogin: true,
          showRegistration: true
        })
      });

    app.route('/profile')
      .get(ensureAuthenticated, (req, res) => {;
        res.render(process.cwd() + '/views/pug/profile', {
          username: req.user.username
        });
      });

    app.route('/login')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), (req, res) => {
      res.redirect('/profile');
    });

    app.route('/logout')
      .get((req, res) => {
        req.logout();
        res.redirect('/');
      });

    app.route('/register')
      .post((req, res, next) => {
          db.collection('users').findOne({
            username: req.body.username
          }, function (err, user) {
            if (err) {
              next(err);
            } else if (user) {
              res.redirect('/');
            } else {
              db.collection('users').insertOne({
                  username: req.body.username,
                  password: req.body.password
                },
                (err, doc) => {
                  if (err) {
                    res.redirect('/');
                  } else {
                    next(null, user);
                  }
                }
              )
            }
          })
        },
        passport.authenticate('local', {
          failureRedirect: '/'
        }),
        (req, res, next) => {
          res.redirect('/profile');
        }
      );


    app.use((req, res, next) => {
      res.status(404)
        .type('text')
        .send('Not Found');
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log("Listening on port " + process.env.PORT);
    });

  }
});