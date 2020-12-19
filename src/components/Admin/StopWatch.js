import React, { Component } from "react";
import Button from '@material-ui/core/Button'

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  startTimer = () => {
    console.log(this.state.timerTime)
    console.log(Date.now() - this.state.timerTime)
    this.setState({
      timerOn: true,
      // timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    })
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      })
    }, 10)
  }

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  render() {
    const { timerTime } = this.state;
    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);
    return (
      <div className="Stopwatch">
        {this.props.header !== undefined ? <div className="Stopwatch-header">Stopwatch</div> : null}
        <div className="Stopwatch-display" style={{fontSize: '3.5em'}} >
          {hours}:{minutes}:{seconds}<span style={{fontSize: '0.5em'}}>:{centiseconds}</span>
        </div>
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <Button size='small' onClick={this.startTimer} variant='contained'>{'Start'}</Button>
        )}
        {this.state.timerOn === true && (
          <Button size='small' onClick={this.stopTimer} variant='contained'>{'Stop'}</Button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <Button size='small' onClick={this.startTimer} variant='contained'>{'Resume'}</Button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <Button size='small' onClick={this.resetTimer} variant='contained'>{'Reset'}</Button>
        )}
      </div>
    );
  }
}

export default Stopwatch;