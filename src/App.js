import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import './App.css'
import { Router } from '@reach/router'
import TopNav from './components/Nav/TopNav/TopNav'
import Home from './components/Home/Home'
import Tracker from './components/tracker/Tracker'
import Programs from './components/programs/Programs'
import ProgramForm from './components/programs/ProgramForm'
import Exercises from './components/exercises/Exercises'
import Workouts from './components/workouts/Workouts'
import WorkoutForm from './components/workouts/WorkoutForm'
import Sets from './components/sets/Sets'
import DataConsistency from './components/Admin/DataConsistency'
import Test from './components/Admin/Test'
import TrackerProvider from './context/TrackerProvider'
import ProgramProvider from './context/ProgramProvider'
import SetProvider from './context/SetProvider'
import WoProvider from './context/WoProvider'
import ProgramTracker from './components/tracker/ProgramTracker'

import { activeTheme } from './styles/main-styles'

class App extends Component {
  render() {
    return (
      <TrackerProvider>
        <ProgramProvider>
          <WoProvider>
            <SetProvider>
              <div style={{ backgroundColor: `${activeTheme.color5.hex}` }}>
                <TopNav />
                <CssBaseline />
                <div
                  style={{
                    backgroundColor: `${activeTheme.color5.hex}`,
                    height: '300vh',
                    maxWidth: '80%',
                    margin: '20px auto'
                  }}
                >
                  <Router>
                    <Home path='/' />
                    <Tracker path='/program-tracker' />
                    <Programs path='/programs' />
                    <ProgramForm path='/program-form' />
                    <ProgramForm path='/program-form/:programId' />
                    <Exercises path='/exercises' />
                    <Workouts path='/workouts' />
                    <WorkoutForm path='/workout-form' />
                    <WorkoutForm path='/workout-form/:workoutId' />
                    <Sets path='/sets' />
                    <DataConsistency path='/admin/consistency-check' />
                    <Test path='/admin/test' />
                    <ProgramTracker path='/program-viewer' />
                  </Router>
                </div>
              </div>
            </SetProvider>
          </WoProvider>
        </ProgramProvider>
      </TrackerProvider>
    )
  }
}

export default App
