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
import DataConsistency from './components/Admin/DataConsistency'
import Test from './components/Admin/Test'
import WoDay from './components/Admin/WoDay'
import TrackerProvider from './context/TrackerProvider'
import ProgramProvider from './context/ProgramProvider'
import SetProvider from './context/SetProvider'
import WoProvider from './context/WoProvider'
import ProgramTracker from './components/tracker/ProgramTracker'

import { activeTheme } from './styles/main-styles'
import WoDayProvider from './context/WoDayProvider'

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
                  <WoDayProvider>
                    <Router>
                      <Home path='/' />
                      <Tracker path='/program-tracker' />
                      <Programs path='/programs' />
                      <ProgramForm path='/program-form' />
                      <ProgramForm path='/program-form/:programId' />
                      <Exercises path='/exercises' />
                      <DataConsistency path='/admin/consistency-check' />
                      <Test path='/admin/test' />
                      <WoDay path='/admin/test/woday' />
                      <ProgramTracker path='/program-viewer' />
                    </Router>
                  </WoDayProvider>
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
