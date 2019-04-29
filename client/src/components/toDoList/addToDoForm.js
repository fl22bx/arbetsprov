import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

const AddTodo = gql`
mutation ($todoName: String, $todoDescription: String){
  addToDo(Arguments:{toDoName: $todoName, toDoDescription:$todoDescription}){
    _id
    toDoName
    toDoDescription
  }
}
`

export const AddForm = (props) => {
  const { open, setOpen } = props
  const [ todoName, setTodoName ] = useState('')
  const [ todoDescription, setTodoDescription ] = useState('')

  return (

    <Dialog open={open}>

      <Mutation
        mutation={AddTodo}
        onCompleted={({ addToDo }) => {
          // add to list
          console.log(addToDo)
        }}>
        {(add) => (
          <div className={'formModal'}>
            <FormControl fullWidth='true' className={'formControll'}>
              <InputLabel htmlFor='todoName'>ToDO Name</InputLabel>
              <Input id='todoName' value={todoName} onChange={(event) => setTodoName(event.target.value)} />

              <FormHelperText id='component-helper-text'>Some important helper text</FormHelperText>
            </FormControl>
            <FormControl fullWidth='true' className={'formControll'}>
              <InputLabel htmlFor='todoDescription'>ToDO Description</InputLabel>
              <Input id='todoDescription' value={todoDescription} onChange={(event) => setTodoDescription(event.target.value)} />

              <FormHelperText id='component-helper-text'>Some important helper text</FormHelperText>
            </FormControl>

            <Button onClick={() => {
              add({ variables: { todoName, todoDescription } })
              setTodoName('')
              setTodoDescription('')
            }} >
              Save
            </Button>
            <Button onClick={() => setOpen(false)}>
             Close
            </Button>
          </div>
        )
        }

      </Mutation>

    </Dialog>
  )
}
