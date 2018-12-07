Advanced Node and Express - Hashing Your Passwords

Going back to the information security section you may remember that storing plaintext passwords is never okay. Now it is time to implement BCrypt to solve this issue.

Add BCrypt as a dependency and require it in your server. You will need to handle hashing in 2 key areas: where you handle registering/saving a new account and when you check to see that a password is correct on login.

Currently on our registeration route, you insert a user's password into the database like the following: password: req.body.password. An easy way to implement saving a hash instead is to add the following before your database logic var hash = bcrypt.hashSync(req.body.password, 12); and replacing the req.body.password in the database saving with just password: hash.

Finally on our authentication strategy we check for the following in our code before completing the process: if (password !== user.password) { return done(null, false); }. After making the previous changes, now user.password is a hash. Before making a change to the existing code, notice how the statement is checking if the password is NOT equal then return non-authenticated. With this in mind your code could look as follows to properly check the password entered against the hash: if (!bcrypt.compareSync(password, user.password)) { return done(null, false); }

That is all it takes to implement one of the most important security features when you have to store passwords! Submit your page when you think you've got it right.
