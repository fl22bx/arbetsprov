
import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { ToDoList } from './toDoList/ToDoList'
import _ from 'lodash'
import './App.css'

const TODOS = gql`
query {
  todos {
    _id
    toDoName
    toDoDescription
    completed
  }
}
`

export const App = () => {
  return (
    <div className='wrapper'>
      <div className='header'>
        <h1>ToDoList</h1>
      </div>
      <Query query={TODOS}>
        {({ loading, data }) => {
          if (loading) return 'Loading...'
          const todos = _.filter(data.todos, { completed: false })
          const completedToDos = _.filter(data.todos, { completed: true })

          return <ToDoList todos={todos} completedToDos={completedToDos} />
        }}
      </Query>
    </div>

  )
}
