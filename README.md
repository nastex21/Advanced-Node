Advanced Node and Express - Implementation of Social Authentication III

The final part of the strategy is handling the profile returned from Github. We need to load the users database object if it exists or create one if it doesn't and populate the fields from the profile, then return the user's object. Github supplies us a unique id within each profile which we can use to search with to serialize the user with (already implemented). Below is an example implementation you can use in your project- it goes within the function that is the second argument for the new strategy, right below the console.log(profile); currently is:

```
db.collection('socialusers').findAndModify(
    {id: profile.id},
    {},
    {$setOnInsert:{
        id: profile.id,
        name: profile.displayName || 'John Doe',
        photo: profile.photos[0].value || '',
        email: profile.emails[0].value || 'No public email',
        created_on: new Date(),
        provider: profile.provider || ''
    },$set:{
        last_login: new Date()
    },$inc:{
        login_count: 1
    }},
    {upsert:true, new: true},
    (err, doc) => {
        return cb(null, doc.value);
    }
);
```

With a findAndModify, it allows you to search for an object and update it, as well as upsert the object if it doesn't exist and receive the new object back each time in our callback function. In this example, we always set the last_login as now, we always increment the login_count by 1, and only when we insert a new object(new user) do we populate the majority of the fields. Something to notice also is the use of default values. Sometimes a profile returned won't have all the information filled out or it will have been chosen by the user to remain private; so in this case we have to handle it to prevent an error.
