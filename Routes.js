const passport = require('passport');
const bcrypt = require('bcrypt');

module.exports = function (app, db) {
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

    app.route('/register').post((req, res, next) => {
        var hash = bcrypt.hashSync(req.body.password, 12);
        db.collection('users').findOne({
            username: req.body.username
        }, function (err, user) {
            if (err) {
                res.send(err);
            } else if (user) {
                res.redirect('/');
            } else {
                db.collection('users').insertOne({
                        username: req.body.username,
                        password: hash
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

    app.use((req, res, next) => {
        res.status(404)
            .type('text')
            .send('Not Found');
    });
}