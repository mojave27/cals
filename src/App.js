import React, { Component } from 'react'
import './App.css'
import { Router } from '@reach/router'
import TopNav from './components/Nav/TopNav/TopNav'
import Home from './components/Home/Home'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Programs from './components/programs/Programs'
import Exercises from './components/exercises/Exercises'
import Workouts from './components/workouts/Workouts'

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#444650' }}>
        <TopNav />
        <CssBaseline />
        {/* <div style={{ paddingTop: '20px' }}> */}
          <Container maxWidth='md'>
            <Typography
              component='div'
              style={{ backgroundColor: '#E8E8E9', height: '100vh' }}
            >
              <Router>
                <Home path='/' />
                <Programs path='/programs' />
                <Exercises path='/exercises' />
                <Workouts path='/workouts' />
              </Router>
            </Typography>
          </Container>
        </div>
      // </div>
    )
  }
}

export default App
