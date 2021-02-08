import React, { Fragment, useContext, useState } from 'react'
import StopWatch from './StopWatch'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import ThemeContext from '../../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  appBar: { }
}))

const WoDayAppBar = props => {
  let themeContext = useContext(ThemeContext)
  const classes = useStyles(themeContext)
  let [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  const isMobile = () => themeContext.mobile

  return (
    <AppBar position='sticky' className={classes.appBar}>
      <Toolbar>
        {show === false ? (
          <Fragment>
            <div style={{ flexGrow: 1, float: 'left' }}>
              <Button
                color={'inherit'}
                onClick={toggleShow}
                style={{ flexGrow: 1, float: 'left' }}
              >
                {'Stopwatch'}
              </Button>
            </div>
            {isMobile() ?
            <div>
              <Button color={'inherit'} onClick={props.onSave}>
                {'Save'}
              </Button>
              <Button color={'inherit'} onClick={props.onClose}>
                {'Close'}
              </Button>
            </div>
            : null}
          </Fragment>
        ) : (
          <StopWatch
            onClose={toggleShow}
            onSaveToDuration={props.onSaveToDuration}
          />
        )}
        {isMobile() === false ?
        <div>
          <Button color={'inherit'} onClick={props.onSave}>
            {'Save'}
          </Button>
          <Button color={'inherit'} onClick={props.onClose}>
            {'Close'}
          </Button>
        </div> : null}
      </Toolbar>
    </AppBar>
  )
}

export default WoDayAppBar
