import React, { useState, useEffect } from 'react'
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
import _ from 'lodash'
import './ToDoList.css'

export const ToDoList = (props) => {
  const [open, setOpen] = useState(false)
  const [chosenTodDo, setChosenTodDo] = useState(null)
  const [todos, setTodos] = useState(props.todos)
  const [completedTodos, setCompletedTodos] = useState(props.completedToDos)

  const changeTodoList = (todo) => {
    const ToDOindex = _.findIndex(todos, { _id: todo._id })
    if (ToDOindex >= 0) {
      todos[ToDOindex] = todo
      setTodos([...todos])
    } else {
      setTodos([...todos, todo])
    }
  }

  function toDods (array) {
    return array.map(value => (
      <ListItem>
        <ListItemText
          primary={value.toDoName}
          secondary={value.toDoDescription}
        />
        <ListItemSecondaryAction>
          <Mutation
            mutation={AddTodo}
            onCompleted={({ addToDo }) => {
              props.changeTodoList(addToDo)
            }}>
            <IconButton >
              <CheckIcon className={'complete'} />
            </IconButton>
          </Mutation>
          <IconButton id={value._id} onClick={edit} >
            <EditIcon id={value._id} className={'edit'} />
          </IconButton>
          <IconButton >
            <DeleteIcon className={'delete'} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
    )
  }
  const edit = (event) => {
    const id = event.currentTarget.getAttribute('id')
    const currentTodo = _.find(todos, { _id: id })
    setOpen(true)
    setChosenTodDo(currentTodo)
  }
  const openModal = () => {
    console.log(todos)
    setOpen(true)
  }

  return (
    <div className='ToDoList'>
      <AddForm setOpen={setOpen} open={open} chosenTodDo={chosenTodDo} setChosenTodDo={setChosenTodDo} changeTodoList={changeTodoList} />
      <AppBar position='static'>
        <Toolbar className={'todos'}>
          <span className={'grow'}>
            <Badge className={'todoHeader'} color='primary' badgeContent={todos.length}>
               Tasks
            </Badge>
          </span>

          <IconButton onClick={openModal} className={'add'}>
            <AddIcon className={'addIcon'} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List dense>
        {toDods(todos)}
      </List>

      <div>
        <Toolbar className={'completedTodos'}>

          <Badge className={'todoHeader'} color='primary' badgeContent={completedTodos.length}>
               Tasks
          </Badge>
        </Toolbar>
        <List dense />

      </div>
    </div>
  )
}
