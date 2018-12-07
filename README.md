Advanced Node and Express - Create New Middleware

As in, any user can just go to /profile whether they authenticated or not by typing in the url. We want to prevent this by checking if the user is authenticated first before rendering the profile page. This is the perfect example of when to create a middleware.

The challenge here is creating the middleware function ensureAuthenticated(req, res, next), which will check if a user is authenticated by calling passports isAuthenticated on the request which in turn checks for req.user is to be defined. If it is then next() should be called, otherwise we can just respond to the request with a redirect to our homepage to login. An implementation of this middleware is:

```
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/');
};
```

Now add ensureAuthenticated as a middleware to the request for the profile page before the argument to the get request containing the function that renders the page.

```
app.route('/profile')
  .get(ensureAuthenticated, (req,res) => {
       res.render(process.cwd() + '/views/pug/profile');
  });
  ```
