- Create a repository
- Initialize the repository
- node modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What's the use of -g while npm install
- Differnce between caret and tilde in the representation of the versions


- initialize git
- .gitignore
- Create a remote repo on github
- Push all the code to remote origin
- Play with routes and route extensions like /hello, /hello/2, /xyz
- Order of the routes matter a lot
- Install postman app and make a workspace > collection > test API call
- Write logic to handle GET, POST, PATCH, DELETE and PUT requests and test them on postman
- Explore routing and use of ?, +, () and * in the routes
- Use of regex in routes
- Reading the query params in the routes
- Reading the dynamic routes


- Multiple route handlers
- next()
- next() function and errors with res.send()
- What is a middleware and why do we need it
- How expressJS basically handles the req BTS
- Read HTTP status codes
- app.use() vs app.all()
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes
- Error handling 

- Create a free cluster on mongoDB official website (Mongo Atlas)
- Install Mongoose
- Connect your appliaction to db
- Connect to db before starting the server to listen
- Create a userSchema and userModel
- Create POST /signup API to add the data to db 
- Push some documents using API calls from postman

- Js objects vs JSON
- Add the express.json middleware to your app
- Make your signup API dynamic to receive the data from end user
- If we use User.findOne() to find the user with given emailId but there exist duplicate entries, then which one will be returned
- Create API to get users by emailId
- Create Feed API - GET /feed - get all the users from the database
- Create a delete user API
- Difference in PATCH and PUT method
- API - Update a user
- Explore the Mongoose Documention for Model methods
- What are options in a Model.findOneAndUpdate method, explore more about it
- API - Update the user with email ID

- Explore schematype options from the documention
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema - PUT all appropiate validations on each field in Schema
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanitizing - Add API validation for each field
