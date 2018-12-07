Advanced Node and Express - Clean Up Your Project with Modules

Right now everything you have is in your server.js file. This can lead to hard to manage code that isn't very expandable.

Create 2 new files: Routes.js and Auth.js

Both should start with the following code:

```
module.exports = function (app, db) {


}
```

Now in the top of your server file, require these files like such: const routes = require('./routes.js');

Right after you establish a successful connect with the database instantiate each of them like such: routes(app, db)

Finally, take all of the routes in your server and paste them into your new files and remove them from your server file. Also take the ensureAuthenticated since we created that middleware function for routing specifically. You will have to now correctly add the dependencies in that are used, such as const passport = require('passport');, at the very top above the export line in your routes.js file.

Keep adding them until no more errors exist, and your server file no longer has any routing!

Now do the same thing in your auth.js file with all of the things related to authentication such as the serialization and the setting up of the local strategy and erase them from your server file. Be sure to add the dependencies in and call auth(app,db) in the server in the same spot. Be sure to have auth(app, db) before routes(app, db) since our registration route depends on passport being initiated!

Congratulations- you're at the end of this section of Advanced Node and Express and have some beautiful code to show for it! Submit your page when you think you've got it right. If you're running into errors, you can check out an example of the completed project here.
