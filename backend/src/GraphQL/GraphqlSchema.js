const { ToDo } = require('../dbConfig')
const { gql } = require('apollo-server-express')

const typeDefs = gql`
type Query {
  todos: [toDo]
}
type toDo {
  _id: String
  toDoName: String
  toDoDescription: String
  completed: Boolean
}
input ToDoInput {
  toDoName: String
  toDoDescription: String
  id: String
}
type Mutation {
  addToDo(Arguments: ToDoInput): toDo
}
`

const resolvers = {
  Query: {
    todos: () => ToDo.find({})
  },
  Mutation: {
    addToDo: async (parent, { Arguments }) => {
      if (Arguments.id) {
        const doc = await ToDo.findOne({ _id: Arguments.id })
        console.log(doc)
        doc.toDoName = Arguments.toDoName
        doc.toDoDescription = Arguments.toDoDescription
        return doc.save()
      }
      return new ToDo({ completed: false, ...Arguments }).save()
    }

  }
}
module.exports = {
  typeDefs,
  resolvers
}
