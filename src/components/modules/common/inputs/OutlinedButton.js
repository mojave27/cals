import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme, styles) => ({
  root: {
    cursor: 'pointer',
  }
}))

const FormButton = props => {
  const classes = useStyles(props.styleProps)

  return (
    <Button
      className={classes.root}
      variant='outlined'
      onClick={props.onClick}
      size='small'
    >
      {props.value}
    </Button>
  )
}

export default FormButton
