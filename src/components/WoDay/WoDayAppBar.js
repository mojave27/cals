import React, { useContext, useState } from 'react'
import StopWatch from './StopWatch'
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
  let [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  return (
    <AppBar position='sticky' className={classes.appBar}>
      <Toolbar>
        {show === false ? (
          <div style={{flexGrow: 1, float: 'left'}}>
          <Button color={'inherit'} onClick={toggleShow} style={{flexGrow: 1, float: 'left'}}>
            {'Stopwatch'}
          </Button>
          </div>
        ) : null}
        {show === true ? <StopWatch onClose={toggleShow} /> : null}
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
