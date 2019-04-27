import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'
import './App.css'

const GET_MOVIES = gql`
query {
  hello
}
`

export const App = () => {
  return (
    <Query query={GET_MOVIES}>
      {({ data }) => {
        return (
          <p>{data.hello}</p>
        )
      }}
    </Query>
  )
}
