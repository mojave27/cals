import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.color3.hex,
    float: 'right',
    fontSize: '24px',
    fontWeight: 'bold',
    position: 'relative',
    top: '-16px',
    right: '5px',
    '&:hover': {
      color: `${theme.color4.hex}`,
      textDecoration: 'none',
      cursor: 'pointer'
    },
    '&:focus': {
      color: `${theme.color4.hex}`,
      textDecoration: 'none',
      cursor: 'pointer'
    },
    '&:after': {
      content: '""',
      display: 'table',
      clear: 'both'
    }
  }
}))

const CloseButton = props => {
  const classes = useStyles()

  return (
    <span className={classes.root} onClick={props.handleClose}>
      &times;
    </span>
  )
}

export default CloseButton
