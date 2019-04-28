import React, { useState } from 'react'
import { IconButton, ListItem, List, ListItemText, ListItemSecondaryAction } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import CheckIcon from '@material-ui/icons/Check'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Badge from '@material-ui/core/Badge'
import { AddForm } from './addToDoForm'

import './ToDoList.css'

const styles = () => ({
  todoHeader: {
    padding: '5px'
  },
  grow: {
    flexGrow: 1
  },
  delete: {
    color: 'red'
  },
  edit: {
    color: 'blue'
  },
  complete: {
    color: 'green'
  }
})

export const ToDoList = withStyles(styles)((props) => {
  const [open, setOpen] = useState(false)

  function toDods () {
    return ['todo1', 'todo2', 'todo3'].map(value => (
      <ListItem>
        <ListItemText
          primary={value}
          secondary='undertext'
        />
        <ListItemSecondaryAction>
          <IconButton aria-label='Delete'>
            <CheckIcon className={props.classes.complete} />
          </IconButton>
          <IconButton aria-label='Delete'>
            <EditIcon className={props.classes.edit} />
          </IconButton>
          <IconButton aria-label='Delete'>
            <DeleteIcon className={props.classes.delete} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
    )
  }
  const openModal = () => {
    setOpen(true)
  }

  return (
    <div className='ToDoList'>
      <AddForm setOpen={setOpen} open={open} />
      <div>ToDoList</div>
      <p>{props.data.hello}</p>

      <AppBar position='static'>

        <Toolbar>
          <span className={props.classes.grow}>
            <Badge className={props.classes.todoHeader} color='secondary' badgeContent={4}>
               Tasks
            </Badge>
          </span>

          <IconButton aria-label='Add' onClick={openModal}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List dense>
        {toDods()}
      </List>

      <div>
        <h1>Completed Tasks</h1>
        <List dense>
          {toDods()}
        </List>

      </div>
    </div>
  )
})
