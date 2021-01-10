import React from 'react'
import { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ThemeContext from '../../context/ThemeContext'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme, styles) => ({
  root: {
    // color: theme.color5_text.hex,
    // margin: '3px 10px',
    // border: `1px solid ${theme.color3.hex}`,
    // backgroundColor: theme.color4.hex,
    cursor: 'pointer',
    '&:hover': {
      // backgroundColor: theme.color3.hex,
      // color: theme.color3_text.hex,
      // border: `1px solid ${theme.color4.hex}`
    },
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
