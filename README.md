Advanced Node and Express - Set up Passport

As a reminder, this project is being built upon the following starter project on Glitch, or cloned from GitHub.

It's time to set up Passport so we can finally start allowing a user to register or login to an account! In addition to Passport, we will use Express-session to handle sessions. Using this middleware saves the session id as a cookie in the client and allows us to access the session data using that id on the server. This way we keep personal account information out of the cookie used by the client to verify to our server they are authenticated and just keep the key to access the data stored on the server.

To set up Passport for use in your project, you will need to add it as a dependency first in your package.json. "passport": "^0.3.2"

In addition, add Express-session as a dependency now as well. Express-session has a ton of advanced features you can use but for now we're just going to use the basics! "express-session": "^1.15.0"

You will need to set up the session settings now and initialize Passport. Be sure to first create the variables 'session' and 'passport' to require 'express-session' and 'passport' respectively.

To set up your express app to use use the session we'll define just a few basic options. Be sure to add 'SESSION_SECRET' to your .env file and give it a random value. This is used to compute the hash used to encrypt your cookie!

As well you can go ahead and tell your express app to use 'passport.initialize()' and 'passport.session()'. (For example, app.use(passport.initialize());)
