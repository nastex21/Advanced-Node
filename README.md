Advanced Node and Express - How to Put a Profile Together

Now that we can ensure the user accessing the /profile is authenticated, we can use the information contained in 'req.user' on our page!

Go ahead and pass the object containing the variable username equaling 'req.user.username' into the render method of the profile view. Then go to your 'profile.pug' view and add the line h2.center#welcome Welcome, #{username}! creating the h2 element with the class 'center' and id 'welcome' containing the text 'Welcome, ' and the username!

Also in the profile, add a link to /logout. That route will host the logic to unauthenticate a user. a(href='/logout') Logout
