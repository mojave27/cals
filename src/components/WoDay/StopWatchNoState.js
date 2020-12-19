import React, { Component } from "react";
import Button from '@material-ui/core/Button'

class Stopwatch extends Component {
  startTimer = () => {
    this.props.startTimer()
  }

  stopTimer = () => {
    this.props.stopTimer()
  }

  resetTimer = () => {
    this.props.resetTimer()
  }

  doStuff = () => {
    console.log(this.props)
  }

  render() {
    // const { timerTime } = this.props
    {this.doStuff()}
    let centiseconds = ("0" + (Math.floor(this.props.timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(this.props.timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(this.props.timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(this.props.timerTime / 3600000)).slice(-2);
    return (
      <div className="Stopwatch">
        {this.props.header !== undefined ? <div className="Stopwatch-header">Stopwatch</div> : null}
        <div className="Stopwatch-display" style={{fontSize: '3.5em'}} >
          {hours}:{minutes}:{seconds}<span style={{fontSize: '0.5em'}}>:{centiseconds}</span>
        </div>
        {this.props.timerOn === false && this.props.timerTime === 0 && (
          <Button size='small' onClick={this.startTimer} variant='contained'>{'Start'}</Button>
        )}
        {this.props.timerOn === true && (
          <Button size='small' onClick={this.stopTimer} variant='contained'>{'Stop'}</Button>
        )}
        {this.props.timerOn === false && this.props.timerTime > 0 && (
          <Button size='small' onClick={this.startTimer} variant='contained'>{'Resume'}</Button>
        )}
        {this.props.timerOn === false && this.props.timerTime > 0 && (
          <Button size='small' onClick={this.resetTimer} variant='contained'>{'Reset'}</Button>
        )}
      </div>
    );
  }
}

export default Stopwatch;