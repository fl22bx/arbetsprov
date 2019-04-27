const express = require('express')
const path = require('path')
const { resolvers, typeDefs } = require('./src/GraphQL/GraphqlSchema')
const { ApolloServer } = require('apollo-server-express')
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../client')))

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

app.listen(port, () => {
  console.log(`App listens to port ${port}
GraphQL endpoint: ${server.graphqlPath}`)
})
