import React from 'react'
import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from 'context/ThemeContext'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme, styles) => ({
  root: {
    cursor: 'pointer',
  }
}))

const FormButton = props => {
  const themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext.theme, props.styleProps)

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
