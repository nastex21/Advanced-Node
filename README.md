**FreeCodeCamp**

https://learn.freecodecamp.org/information-security-and-quality-assurance/advanced-node-and-express/set-up-a-template-engine/

Advanced Node and Express - Set up a Template Engine
As a reminder, this project is being built upon the following starter project on Glitch, or cloned from GitHub.

A template engine enables you to use static template files (such as those written in Pug) in your app. At runtime, the template engine replaces variables in a template file with actual values which can be supplied by your server, and transforms the template into a static HTML file that is then sent to the client. This approach makes it easier to design an HTML page and allows for displaying of variables on the page without needing to make an API call from the client.

To set up Pug for use in your project, you will need to add it as a dependency first in your package.json. "pug": "^0.1.0"

Now to tell Node/Express to use the templating engine you will have to tell your express app to set 'pug' as the 'view-engine'. app.set('view engine', 'pug')

Lastly, you should change your response to the request for the index route to res.render with the path to the view views/pug/index.pug.

If all went as planned, you should refresh your apps home page and see a small message saying you're successfully rending the Pug from our Pug file! Submit your page when you think you've got it right.
