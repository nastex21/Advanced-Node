Advanced Node and Express - Implementation of Social Authentication

The basic path this kind of authentication will follow in your app is:

User clicks a button or link sending them to our route to authenticate using a specific strategy (EG. Github)
Your route calls passport.authenticate('github') which redirects them to Github.
The page the user lands on, on Github, allows them to login if they aren't already. It then asks them to approve access to their profile from our app.
The user is then returned to our app at a specific callback url with their profile if they are approved.
They are now authenticated and your app should check if it is a returning profile, or save it in your database if it is not.
Strategies with OAuth require you to have at least a Client ID and a Client Secret which is a way for them to verify who the authentication request is coming from and if it is valid. These are obtained from the site you are trying to implement authentication with, such as Github, and are unique to your app- THEY ARE NOT TO BE SHARED and should never be uploaded to a public repository or written directly in your code. A common practice is to put them in your .env file and reference them like: process.env.GITHUB_CLIENT_ID. For this challenge we're going to use the Github strategy.

Obtaining your Client ID and Secret from Github is done in your account profile settings under 'developer settings', then 'OAuth applications'. Click 'Register a new application', name your app, paste in the url to your glitch homepage (Not the project code's url), and lastly for the callback url, paste in the same url as the homepage but with '/auth/github/callback' added on. This is where users will be redirected to for us to handle after authenticating on Github. Save the returned information as 'GITHUB_CLIENT_ID' and 'GITHUB_CLIENT_SECRET' in your .env file.

On your remixed project, create 2 routes accepting GET requests: /auth/github and /auth/github/callback. The first should only call passport to authenticate 'github' and the second should call passport to authenticate 'github' with a failure redirect to '/' and then if that is successful redirect to '/profile' (similar to our last project).

An example of how '/auth/github/callback' should look is similar to how we handled a normal login in our last project:
```
app.route('/login')
  .post(passport.authenticate('local', { failureRedirect: '/' }), (req,res) => { 
    res.redirect('/profile'); 
  });
```
