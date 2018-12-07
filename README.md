Advanced Node and Express - Use a Template Engine's Powers
As a reminder, this project is being built upon the following starter project on Glitch, or cloned from GitHub.

One of the greatest features of using a template engine is being able to pass variables from the server to the template file before rendering it to HTML.

In your Pug file, you're about to use a variable by referencing the variable name as #{variable_name} inline with other text on an element or by using an equal side on the element without a space such as p= variable_name which sets that p elements text to equal the variable.

We strongly recommend looking at the syntax and structure of Pug here on their Githubs README. Pug is all about using whitespace and tabs to show nested elements and cutting down on the amount of code needed to make a beautiful site.

Looking at our pug file 'index.pug' included in your project, we used the variables title and message

To pass those alone from our server, you will need to add an object as a second argument to your res.render with the variables and their value. For example, pass this object along setting the variables for your index view: {title: 'Hello', message: 'Please login'

It should look like: res.render(process.cwd() + '/views/pug/index', {title: 'Hello', message: 'Please login'});

Now refresh your page and you should see those values rendered in your view in the correct spot as laid out in your index.pug file! Submit your page when you think you've got it right.
