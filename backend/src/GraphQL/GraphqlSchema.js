const { ToDo } = require('../dbConfig')
const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Query {
  hello: String
}
type toDo {
  _id: String
  toDoName: String
  toDoDescription: String
}
input ToDoInput {
  toDoName: String
  toDoDescription: String
}
type Mutation {
  addToDo(Arguments: ToDoInput): toDo
}
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  Mutation: {
    addToDo: (parent, { Arguments }) => new ToDo({ ...Arguments }).save()

  }
}
module.exports = {
  typeDefs,
  resolvers
}
