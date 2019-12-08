import React, { Component } from 'react'
import './App.css'
import { Router } from '@reach/router'
import TopNav from './components/Nav/TopNav/TopNav'
import Home from './components/Home/Home'
import CssBaseline from '@material-ui/core/CssBaseline'
import Programs from './components/programs/Programs'
import ProgramForm from './components/programs/ProgramForm'
import Exercises from './components/exercises/Exercises'
import Workouts from './components/workouts/Workouts'
import Sets from './components/sets/Sets'
import { activeTheme } from './styles/main-styles'

class App extends Component {

  render() {
    return (
      <div style={{ backgroundColor: `${activeTheme.color1.hex}` }}>
        <TopNav />
        <CssBaseline />
        <div
          style={{
            // backgroundColor: '#2D3540',
            backgroundColor: `${activeTheme.color1.hex}`,
            height: '200vh',
            maxWidth: '80%',
            margin: '20px auto'
          }}
        >
          <Router>
            <Home path='/' />
            <Programs path='/programs' />
            <ProgramForm path='/program-form' />
            <ProgramForm path='/program-form/:programId' />
            <Exercises path='/exercises' />
            <Workouts path='/workouts' />
            <Sets path='/sets' />
          </Router>
        </div>
      </div>
    )
  }
}

export default App
