import React, { Component } from 'react'
import { Button, Grid } from '@material-ui/core'

class Stopwatch extends Component {
  state = {
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
    this.setState({ timerOn: false })
    clearInterval(this.timer)
  }

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    })
  }

  render() {
    const { timerTime } = this.state
    let centiseconds = ('0' + (Math.floor(timerTime / 10) % 100)).slice(-2)
    let seconds = ('0' + (Math.floor(timerTime / 1000) % 60)).slice(-2)
    let minutes = ('0' + (Math.floor(timerTime / 60000) % 60)).slice(-2)
    let hours = ('0' + Math.floor(timerTime / 3600000)).slice(-2)
    return (
        <div style={{ fontSize: '3.5em', border:'1px solid red', flexGrow: 1 }}>
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
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <Button color={'inherit'} onClick={this.startTimer}>
              {'Resume'}
            </Button>
          )}
          {this.state.timerOn === false && this.state.timerTime > 0 && (
            <Button color={'inherit'} onClick={this.resetTimer}>
              {'Reset'}
            </Button>
          )}
        </div>
    )
  }
}

export default Stopwatch
