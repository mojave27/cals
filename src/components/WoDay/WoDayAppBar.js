import React, { useContext, useState } from 'react'
import StopWatch from './StopWatch'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.color3.hex,
    color: theme.color3_text.hex
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
          <div style={{ flexGrow: 1, float: 'left' }}>
            <Button
              color={'inherit'}
              onClick={toggleShow}
              style={{ flexGrow: 1, float: 'left' }}
            >
              {'Stopwatch'}
            </Button>
          </div>
        ) : <StopWatch onClose={toggleShow} onSaveToDuration={props.onSaveToDuration} /> }
        <div>
          <Button color={'inherit'} onClick={props.onSave}>
            {'Save'}
          </Button>
          <Button color={'inherit'} onClick={props.onClose}>
            {'Close'}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default WoDayAppBar
