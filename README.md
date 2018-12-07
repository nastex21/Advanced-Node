Advanced Node and Express - Logging a User Out

Creating the logout logic is easy. The route should just unauthenticate the user and redirect to the home page instead of rendering any view.

In passport, unauthenticating a user is as easy as just calling req.logout(); before redirecting.

```
app.route('/logout')
  .get((req, res) => {
      req.logout();
      res.redirect('/');
  });
 ```

You may have noticed we also we're not handling missing pages (404), the common way to handle this in Node is with the following middleware. Go ahead and add this in after all your other routes:

```
app.use((req, res, next) => {
  res.status(404)
    .type('text')
    .send('Not Found');
});
```
