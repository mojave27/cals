import React from 'react'
import { Router } from '@reach/router'
import Home from './Home/Home'
import Login from './Auth/Login'
import Tracker from './tracker/Tracker'
import ProgramForm from './programs/ProgramForm'
import Exercises from './exercises/Exercises'
import DataConsistency from './Admin/DataConsistency'
import Test from './Admin/Test'
import Themer from './prefs/Themer'
import WoDay from './WoDay/WoDay'
import Workouts from './workouts/Workouts'
import WoDayTracker from './tracker/WoDayTracker'

const Routes = () => {
  return (
    <Router>
      <Home path='/' />
      <Tracker path='/program-tracker' />
      <ProgramForm path='/program-form' />
      <ProgramForm path='/program-form/:programId' />
      <Exercises path='/exercises' />
      <Workouts path='/manage/workouts' />
      <DataConsistency path='/admin/consistency-check' />
      <Test path='/admin/test' />
      <Themer path='/prefs/themer' />
      <WoDay path='/woday' />
      <WoDayTracker path='/tracker/woday' />
      <Login path='/login' />
    </Router>
  )
}

export default Routes
