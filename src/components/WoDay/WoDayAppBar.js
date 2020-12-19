import React from 'react'
import StopWatch from '../Admin/StopWatch'
import StopWatchNoState from './StopWatchNoState'
import { AppBar, Toolbar } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow'

const WoDayAppBar = props => {
  return (
    <Grow
      in={props.show}
      style={{ transformOrigin: '0 0 0' }}
      {...(props.show ? { timeout: 1000 } : {})}
    >
      <AppBar position='sticky'>
        <Toolbar>
          <StopWatchNoState 
            startTimer={props.startTimer}
            stopTimer={props.stopTimer}
            resetTimer={props.resetTimer}
            timerTime={props.timerTime}
            timerOn={props.timerOn}
          />
            {/* <StopWatch /> */}
          <Button
            style={{ margin: '0px 5px 0px 25px' }}
            variant='contained'
            size='small'
            onClick={props.saveWoDay}
          >
            {'Save'}
          </Button>
        </Toolbar>
      </AppBar>
    </Grow>
  )
}

export default WoDayAppBar
