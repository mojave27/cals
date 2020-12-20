import React, { useContext } from 'react'
import StopWatch from '../Admin/StopWatch'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.color5.hex,
    color: theme.color5_text.hex
  }
}))

const WoDayAppBar = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  return (
    <AppBar position='sticky' className={classes.appBar}>
      <Toolbar>
        <StopWatch />
        <Button color={'inherit'} onClick={props.onSave}>
          {'Save'}
        </Button>
        <Button color={'inherit'} onClick={props.onClose}>
          {'Close'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default WoDayAppBar
