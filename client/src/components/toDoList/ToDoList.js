import React, { useState } from 'react'
import { IconButton, ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import { AddForm } from './addToDoForm'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import _ from 'lodash'
import './ToDoList.css'

export const ToDoList = (props) => {
  const [open, setOpen] = useState(false)
  const [chosenTodDo, setChosenTodDo] = useState(null)
  const [todos, setTodos] = useState(props.todos)
  const [completedTodos, setCompletedTodos] = useState(props.completedToDos)

  const markAsComplete = gql`
  mutation ($completed: Boolean, $Id: String){
    markAsComplete(Arguments:{completed: $completed, id:$Id}){
      _id
      completed
    }
  }
  `
  const deleteToDo = gql`
  mutation ($Id: String){
    deleteToDo(id: $Id ) {
      _id
      completed
    }
  }
  `

  const changeTodoList = (todo) => {
    const todosIndex = _.findIndex(todos, { _id: todo._id })
    const completedTodosIndex = _.findIndex(completedTodos, { _id: todo._id })
    if (todosIndex >= 0) {
      todos[todosIndex] = todo
      return setTodos([...todos])
    } else if (completedTodosIndex >= 0) {
      completedTodos[completedTodosIndex] = todo
      return setCompletedTodos([...completedTodos])
    } else {
      return setTodos([...todos, todo])
    }
  }

  const markAsCompleteList = (id, completed) => {
    console.log(id)
    console.log(completed)
    if (completed) {
      const todo = _.remove(todos, { _id: id })
      setCompletedTodos([...completedTodos, ...todo])
    } else {
      const todo = _.remove(completedTodos, { _id: id })
      console.log(todo)
      setTodos([...todos, ...todo])
    }
  }

  const removeToDoFromList = (id, completed) => {
    if (!completed) {
      const todoIndex = _.findIndex(todos, { _id: id })
      todos.splice(todoIndex, 1)
      setTodos([...todos])
    } else {
      const todoIndex = _.findIndex(completedTodos, { _id: id })
      completedTodos.splice(todoIndex, 1)
      setCompletedTodos([...completedTodos])
    }
  }

  const edit = (event) => {
    const id = event.currentTarget.getAttribute('id')
    let currentTodo = _.find(todos, { _id: id })
    console.log(currentTodo)
    if (!currentTodo) { currentTodo = _.find(completedTodos, { _id: id }) }
    setOpen(true)
    setChosenTodDo(currentTodo)
  }
  const openModal = () => {
    console.log(todos)
    setOpen(true)
  }

  function toDods (array, markBool) {
    return array.map(value => (
      <ListItem>
        <ListItemText
          primary={value.toDoName}
          secondary={value.toDoDescription}
        />
        <ListItemSecondaryAction>
          <Mutation mutation={markAsComplete}
            onCompleted={({ markAsComplete }) => {
              markAsCompleteList(markAsComplete._id, markAsComplete.completed)
            }
            }>

            {(mark) => (
              <IconButton id={value._id} onClick={
                (event) => {
                  const id = event.currentTarget.getAttribute('id')
                  mark({ variables: { completed: markBool, Id: id } })
                }
              }
              >
                <CheckIcon className={'complete'} />
              </IconButton>
            )
            }

          </Mutation>
          <IconButton id={value._id} onClick={edit} >
            <EditIcon id={value._id} className={'edit'} />
          </IconButton>
          <Mutation mutation={deleteToDo}
            onCompleted={({ deleteToDo }) => {
              removeToDoFromList(deleteToDo._id, deleteToDo.completed)
            }
            }>
            {(deleteToDo) => (
              <IconButton id={value._id} onClick={
                (event) => {
                  const id = event.currentTarget.getAttribute('id')
                  deleteToDo({ variables: { Id: id } })
                }
              }>
                <DeleteIcon className={'delete'} />
              </IconButton>
            )}
          </Mutation>
        </ListItemSecondaryAction>
      </ListItem>
    )
    )
  }

  return (
    <div className='ToDoList'>
      <div className='tasks'>
        <AddForm setOpen={setOpen} open={open} chosenTodDo={chosenTodDo} setChosenTodDo={setChosenTodDo} changeTodoList={changeTodoList} />
        <AppBar position='static'>
          <Toolbar className={'todos'}>
            <span className={'grow'}>
              <Badge className={'todoHeader'} color='primary' badgeContent={todos.length}>
              Uppgifter
              </Badge>
            </span>

            <IconButton onClick={openModal} className={'add'}>
              <AddIcon className={'addIcon'} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List dense>
          {toDods(todos, true)}
        </List>
      </div>
      <div className='tasks'>
        <Toolbar className={'completedTodos'}>

          <Badge className={'todoHeader'} color='primary' badgeContent={completedTodos.length}>
             Avklarade Uppgifter
          </Badge>
        </Toolbar>
        <List dense>
          {toDods(completedTodos, false)}
        </List>

      </div>
    </div>
  )
}
