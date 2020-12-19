import React, { useContext } from 'react'
import StopWatch from '../Admin/StopWatch'
import { AppBar, Toolbar } from '@material-ui/core'
import Button from '@material-ui/core/Button'
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
        <Button
          style={{ margin: '0px 5px 0px 25px' }}
          variant='contained'
          size='small'
          onClick={props.onSave}
        >
          {'Save'}
        </Button>
        <Button
          style={{ margin: '3px' }}
          variant='contained'
          size='small'
          onClick={props.onClose}
        >
          {'Close'}
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default WoDayAppBar
