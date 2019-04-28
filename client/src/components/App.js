
import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import { ToDoList } from './toDoList/ToDoList'
import './App.css'

const TODOS = gql`
query {
  hello
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

          return <ToDoList data={data} />
        }}
      </Query>
    </div>

  )
}
