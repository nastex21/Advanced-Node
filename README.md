Advanced Node and Express - Authentication Strategies

A strategy is a way of authenticating a user. You can use a strategy for allowing users to authenticate based on locally saved information (if you have them register first) or from a variety of providers such as Google or Github. For this project we will set up a local strategy. To see a list of the 100's of strategies, visit Passports site here.

Add passport-local as a dependency and add it to your server as follows: const LocalStrategy = require('passport-local');

Now you will have to tell passport to use an instantiated LocalStartegy object with a few settings defined. Make sure this as well as everything from this point on is encapsulated in the database connection since it relies on it!

This is defining the process to take when we try to authenticate someone locally. First it tries to find a user in our database with the username entered, then it checks for the password to match, then finally if no errors have popped up that we checked for, like an incorrect password, the users object is returned and they are authenticated.

Many strategies are set up using different settings, general it is easy to set it up based on the README in that strategies repository though. A good example of this is the Github strategy where we don't need to worry about a username or password because the user will be sent to Github's auth page to authenticate and as long as they are logged in and agree then Github returns their profile for us to use.
