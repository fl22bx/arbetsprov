import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'

export const AddForm = (props) => {
  const { open, setOpen } = props

  return (
    <Dialog open={open}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel felis sagittis,
    tempor magna sit amet, porttitor est. Nullam purus dolor, tempus pellentesque ligula fermentum,
    ullamcorper cursus lectus. Morbi rhoncus ultrices eros, nec tincidunt nulla convallis vel. Etiam et
    lorem eget dolor blandit porttitor. Etiam ultrices fringilla lorem at venenatis. Proin vel sagittis sapien.
     Maecenas eget neque nec lorem congue scelerisque. Integer nec enim et lacus cursus pharetra id vitae purus.
     Morbi rhoncus vestibulum dignissim. Vestibulum elementum blandit ipsum, id congue libero.
      <Button >
              Save
      </Button>
      <Button onClick={() => setOpen(false)}>
              Close
      </Button>
    </Dialog>
  )
}
