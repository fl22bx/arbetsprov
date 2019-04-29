import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'

import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'

export const AddForm = (props) => {
  const { open, setOpen } = props
  const [ todoName, setTodoName ] = useState('hej')
  const [ todoDescription, setTodoDescription ] = useState('hej')

  return (
    <Dialog open={open}>
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

        <Button >
              Save
        </Button>
        <Button onClick={() => setOpen(false)}>
              Close
        </Button>
      </div>
    </Dialog>
  )
}
