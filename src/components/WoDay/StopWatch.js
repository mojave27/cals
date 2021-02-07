import React, { Component } from 'react'
import { Button, IconButton, Popover } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'

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
    this.setState({anchorEl: event.currentTarget, showMenu: true})
  }

  handleMenuClose = () => {
    this.setState({showMenu: false})
  }

  render() {
    const { timerTime } = this.state
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2)
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2)
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2)
    let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2)
    return (
      <div style={{ fontSize: 'calc(3vw + 30px)', flexGrow: 1 }}>
        {hours}:{minutes}:{seconds}
        <span style={{ fontSize: '0.5em' }}>:{centiseconds}</span>
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <Button color={'inherit'} onClick={this.startTimer}>
            {'Start'}
          </Button>
        )}
        {this.state.timerOn === true && (
          <Button color={'inherit'} onClick={this.stopTimer}>
            {'Stop'}
          </Button>
        )}
        <Button color={'inherit'} onClick={this.props.onClose}>
          {'Hide'}
        </Button>
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <div style={{ display: 'inline-block' }}>
            <IconButton color={'inherit'} aria-label='More' onClick={this.handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Popover
              // classes={{
              //   paper: classes.paper
              // }}
              anchorEl={this.state.anchorEl}
              // open={Boolean(this.state.anchorEl)}
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
                {/* {this.state.timerOn === false && this.state.timerTime === 0 && (
                <div>
                  <Button color={'inherit'} onClick={this.startTimer}>
                    {'Start'}
                  </Button>
                </div>
                )} */}
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
                  // {this.state.timerTime > 0 && (
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
      </div>
    )
  }
}

export default Stopwatch
