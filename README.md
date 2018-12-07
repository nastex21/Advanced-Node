Advanced Node and Express - Implementation of Social Authentication II

The last part of setting up your Github authentication is to create the strategy itself. For this, you will need to add the dependency of 'passport-github' to your project and require it as GithubStrategy like const GitHubStrategy = require('passport-github').Strategy;.

To set up the Github strategy, you have to tell passport to use an instantiated GithubStrategy, which accepts 2 arguments: An object (containing clientID, clientSecret, and callbackURL) and a function to be called when a user is successfully authenticated which we will determine if the user is new and what fields to save initially in the user's database object. This is common across many strategies but some may require more information as outlined in that specific strategy's github README; for example, Google requires a scope as well which determines what kind of information your request is asking returned and asks the user to approve such access. The current strategy we are implementing has its usage outlined here, but we're going through it all right here on freeCodeCamp!

Here's how your new strategy should look at this point:
```
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: /*INSERT CALLBACK URL ENTERED INTO GITHUB HERE*/
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile);
      //Database logic here with callback containing our user object
  }
));
```
Your authentication won't be successful yet, and actually throw an error, without the database logic and callback, but it should log to your console your Github profile if you try it!
