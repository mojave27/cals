import React, { Component } from "react";
import { Button, Grid } from '@material-ui/core'

class Stopwatch extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

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
        <Grid container spacing={3} justify='center' direction='row' alignContent='center' alignItems='center'>
          {/* <Grid item xs={9} sm={8}> */}
            <div className="Stopwatch-display" style={{fontSize: '3.5em'}} >
              {hours}:{minutes}:{seconds}<span style={{fontSize: '0.5em'}}>:{centiseconds}</span>
            </div>
         {/* </Grid> */}
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          // <Grid item xs={3} sm={2}>
          <div style={{float:'right', marginLeft:'15px'}}>
            <Button size='small' onClick={this.startTimer} variant='contained'>{'Start'}</Button>
          </div>
          // </Grid>
        )}
        {this.state.timerOn === true && (
          // <Grid item xs={3} sm={2}>
            <Button size='small' onClick={this.stopTimer} variant='contained'>{'Stop'}</Button>
          // </Grid>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          // <Grid item xs={1} sm={2}>
            <Button size='small' onClick={this.startTimer} variant='contained'>{'Resume'}</Button>
          // </Grid>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          // <Grid item xs={1} sm={2}>
            <Button size='small' onClick={this.resetTimer} variant='contained'>{'Reset'}</Button>
          // </Grid>
        )}
        </Grid>
      </div>
    );
  }
}

export default Stopwatch;