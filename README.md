Advanced Node and Express - How to Use Passport Strategies

As a reminder, this project is being built upon the following starter project on Glitch, or cloned from GitHub.

In the index.pug file supplied there is actually a login form. It has previously been hidden because of the inline javascript if showLogin with the form indented after it. Before showLogin as a variable was never defined, it never rendered the code block containing the form. Go ahead and on the res.render for that page add a new variable to the object showLogin: true. When you refresh your page, you should then see the form! This form is set up to POST on /login so this is where we should set up to accept the POST and authenticate the user.

For this challenge you should add the route /login to accept a POST request. To authenticate on this route you need to add a middleware to do so before then sending a response. This is done by just passing another argument with the middleware before your function(req,res) with your response! The middleware to use is passport.authenticate('local').

passport.authenticate can also take some options as an argument such as: { failureRedirect: '/' } which is incredibly useful so be sure to add that in as well. As a response after using the middleware (which will only be called if the authentication middleware passes) should be to redirect the user to /profile and that route should render the view 'profile.pug'.

If the authentication was successful, the user object will be saved in req.user.

Now at this point if you enter a username and password in the form, it should redirect to the home page / and in the console of your server should be 'User {USERNAME} attempted to log in.' since we currently cannot login a user who isn't registered.
