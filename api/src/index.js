// index.js
// This is the main entry point of our application

// import the modules at the top of the file
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
// first require the package at the top of the file
const cors = require('cors');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
// first require the package at the top of the file
const helmet = require('helmet')



const db = require('./db');
const models = require('./models');

const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;
const resolvers = require('./resolvers');
const typeDefs = require('./schema');
const jwt = require('jsonwebtoken')



const app = express();
// add the middleware at the top of the stack, after const app = express()
app.use(helmet());
// add the middleware after app.use(helmet());
app.use(cors());
db.connect(DB_HOST);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],

  context: ({req}) => {
    // Add the db models to the context
    const token = req.headers.authorization;
    const user = getUser(token)
    console.log(user)
    return { models , user};

    
  }
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);

const getUser = token =>{
  if(token){
    try {
      return jwt.verify(token,process.env.JWT_SECRET)
    }
    catch (err){
      throw new Error('Session Invalid')
    }
  }
}



// app.get('/', (req, res) => res.send('Hello World!!!'));
// // app.get('/', (req, res) => res.send('Hello World!!!'));

// app.listen(port, () =>
//   console.log(`Server running at http://localhost:${port}`)
// );
