const { ToDo } = require('../dbConfig')
const { gql } = require('apollo-server-express')

// Graph QL Mutations and Querys Schema
//
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
input mark {
  completed: Boolean
  id: String
}
type Mutation {
  addToDo(Arguments: ToDoInput): toDo
  markAsComplete(Arguments: mark): toDo
  deleteToDo(id: String): toDo
}
`
// Graph QL Resolvers:
// Resolve Graph Ql Querys and Mutations
//
const resolvers = {
  Query: {
    todos: () => ToDo.find({})
  },
  Mutation: {
    addToDo: async (parent, { Arguments }) => {
      if (Arguments.id) {
        const doc = await ToDo.findOne({ _id: Arguments.id })
        doc.toDoName = Arguments.toDoName
        doc.toDoDescription = Arguments.toDoDescription
        return doc.save()
      }
      return new ToDo({ completed: false, ...Arguments }).save()
    },
    markAsComplete: async (parent, { Arguments }) => {
      const doc = await ToDo.findOne({ _id: Arguments.id })
      doc.completed = Arguments.completed
      return doc.save()
    },
    deleteToDo: async (parent, { id }) => {
      const doc = await ToDo.findOneAndDelete({ _id: id })
      return doc
    }

  }
}
module.exports = {
  typeDefs,
  resolvers
}
