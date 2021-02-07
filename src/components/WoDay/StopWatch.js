import React, { Component } from 'react'
import { Button, Grid, IconButton, Popover } from '@material-ui/core'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThemeContext from 'context/ThemeContext'

class Stopwatch extends Component {
  state = {
    anchorEl: null,
    showMenu: false,
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerStart: Date.now() - this.state.timerTime
    })
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      })
    }, 10)
  }

  stopTimer = () => {
    this.setState({
      timerOn: false,
      showMenu: false
    })
    clearInterval(this.timer)
  }

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    })
  }

  saveToDuration = () => {
    if (this.props.onSaveToDuration) {
      const { timerTime } = this.state
      let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2)
      let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2)
      let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2)
      let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2)
      let duration = `${hours}:${minutes}:${seconds}:${centiseconds}`
      this.props.onSaveToDuration(duration)
    }
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget, showMenu: true })
  }

  handleMenuClose = () => {
    this.setState({ showMenu: false })
  }

  render() {
    const { timerTime } = this.state
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2)
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2)
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2)
    let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2)
    return (
      <Grid container direction={'row'} spacing={2}>
        <Grid item >
          <div style={{ fontSize: 'calc(3vw + 30px)', flexGrow: 1 }}>
            {hours}:{minutes}:{seconds}
            <span style={{ fontSize: '0.5em' }}>:{centiseconds}</span>
          </div>
        </Grid>
        <Grid item >
          <Grid container direction={'column'} >
            {this.state.timerOn === false && this.state.timerTime === 0 && (
              <Grid item>
                <Button color={'inherit'} onClick={this.startTimer}>
                  {'Start'}
                </Button>
              </Grid>
            )}
            {this.state.timerOn === true && (
              <Grid item>
                <Button color={'inherit'} onClick={this.stopTimer}>
                  {'Stop'}
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button color={'inherit'} onClick={this.props.onClose}>
                {'Hide'}
              </Button>
            </Grid>
            {this.state.timerOn === false && this.state.timerTime > 0 && (
              <div style={{textAlign: 'center'}}>
                <IconButton
                  color={'inherit'}
                  aria-label='More'
                  onClick={this.handleMenuClick}
                  size={'small'}
                >
                  {/* <MoreVertIcon /> */}
                  <MoreHorizIcon />
                </IconButton>
                <Popover
                  anchorEl={this.state.anchorEl}
                  open={this.state.showMenu}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  onClose={this.handleMenuClose}
                  disableRestoreFocus
                >
                  <React.Fragment>
                    {this.state.timerOn === true && (
                      <div>
                        <Button color={'inherit'} onClick={this.stopTimer}>
                          {'Stop'}
                        </Button>
                      </div>
                    )}
                    {this.state.timerOn === false && this.state.timerTime > 0 && (
                      <div>
                        <Button color={'inherit'} onClick={this.startTimer}>
                          {'Resume'}
                        </Button>
                      </div>
                    )}
                    {this.state.timerOn === false && this.state.timerTime > 0 && (
                      <div>
                        <Button color={'inherit'} onClick={this.resetTimer}>
                          {'Reset'}
                        </Button>
                      </div>
                    )}
                    {this.state.timerOn === false && this.state.timerTime > 0 && (
                      <div>
                        <Button color={'inherit'} onClick={this.saveToDuration}>
                          {'Save to Duration'}
                        </Button>
                      </div>
                    )}
                  </React.Fragment>
                </Popover>
              </div>
            )}
          </Grid>
          {/* </div> */}
        </Grid>
      </Grid>
    )
  }
}

export default Stopwatch
