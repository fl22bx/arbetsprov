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

import './ToDoList.css'

export const ToDoList = (props) => {
  const [open, setOpen] = useState(false)

  function toDods () {
    return ['todo1', 'todo2', 'todo3'].map(value => (
      <ListItem>
        <ListItemText
          primary={value}
          secondary='undertext'
        />
        <ListItemSecondaryAction>
          <IconButton >
            <CheckIcon className={'complete'} />
          </IconButton>
          <IconButton >
            <EditIcon className={'edit'} />
          </IconButton>
          <IconButton >
            <DeleteIcon className={'delete'} />
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
      <p>{props.data.hello}</p>
      <AppBar position='static'>
        <Toolbar className={'todos'}>
          <span className={'grow'}>
            <Badge className={'todoHeader'} color='primary' badgeContent={4}>
               Tasks
            </Badge>
          </span>

          <IconButton aria-label='Add' onClick={openModal} className={'add'}>
            <AddIcon className={'addIcon'} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List dense>
        {toDods()}
      </List>

      <div>
        <Toolbar className={'completedTodos'}>

          <Badge className={'todoHeader'} color='primary' badgeContent={4}>
               Tasks
          </Badge>
        </Toolbar>
        <List dense>
          {toDods()}
        </List>

      </div>
    </div>
  )
}
