Advanced Node and Express - Implement the Serialization of a Passport User

Right now we're not loading an actually users object since we haven't set up our database. This can be done many different ways, but for our project we will connect to the database once when we start the server and keep a persistent connection for the full life-cycle of the app.

To do this, add MongoDB as a dependency and require it in your server. (const mongo = require('mongodb').MongoClient;)

Now we want to the connect to our database then start listening for requests. The purpose of this is to not allow requests before our database is connected or if there is a database error. To accomplish you will want to encompass your serialization and your app listener in the following:

You can now uncomment the block in deserializeUser and remove your done(null, null). Be sure to set DATABASE in your .env file to your database's connection string (for example: DATABASE=mongodb://admin:pass@mlab.com:12345/my-project). You can set up a free database on mLab. Congratulations- you've finished setting up serialization!
