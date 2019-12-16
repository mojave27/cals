import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import './App.css'
import { Router } from '@reach/router'
import TopNav from './components/Nav/TopNav/TopNav'
import Home from './components/Home/Home'
import Programs from './components/programs/Programs'
import ProgramForm from './components/programs/ProgramForm'
import Exercises from './components/exercises/Exercises'
import Workouts from './components/workouts/Workouts'
import WorkoutForm from './components/workouts/WorkoutForm'
import Sets from './components/sets/Sets'
import DataConsistency from './components/Admin/DataConsistency'
import SetProvider from './context/SetProvider'
import WoProvider from './context/WoProvider'

import { activeTheme } from './styles/main-styles'


class App extends Component {

  render() {
    return (
      <WoProvider>
        <SetProvider>
          <div style={{ backgroundColor: `${activeTheme.color1.hex}` }}>
            <TopNav />
            <CssBaseline />
            <div
              style={{
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
                <WorkoutForm path='/workout-form' />
                <WorkoutForm path='/workout-form/:workoutId' />
                <Sets path='/sets' />
                <DataConsistency path='/admin/consistency-check' />
              </Router>
            </div>
          </div>
        </SetProvider>
      </WoProvider>
    )
  }
}

export default App
