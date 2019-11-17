import React, { Component } from 'react'
import './App.css'
import { Router } from '@reach/router'
import TopNav from './components/Nav/TopNav/TopNav'
import Home from './components/Home/Home'
import CssBaseline from '@material-ui/core/CssBaseline'
import Programs from './components/programs/Programs'
import Exercises from './components/exercises/Exercises'
import Workouts from './components/workouts/Workouts'

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: '#2D3540' }}>
        <TopNav />
        <CssBaseline />
        <div
          style={{
            backgroundColor: '#2D3540',
            height: '100vh',
            maxWidth: '80%',
            margin: '20px auto'
          }}
        >
          <Router>
            <Home path='/' />
            <Programs path='/programs' />
            <ProgramForm path='/program-form' />
            <Exercises path='/exercises' />
            <Workouts path='/workouts' />
          </Router>
        </div>
      </div>
    )
  }
}

export default App
