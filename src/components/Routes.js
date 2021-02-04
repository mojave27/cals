import React from 'react'
import { Router } from '@reach/router'
import Home from './modules/home/Home'
import Login from './Auth/Login'
import Tracker from './tracker/Tracker'
import ProgramForm from './programs/ProgramForm'
import Exercises from './exercises/Exercises'
import Meal from './cals-and-macros/meal/Meal'
import DataConsistency from './Admin/DataConsistency'
import Test from './Admin/Test'
import MuiPalette from './Admin/MuiPalette'
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
      {/* <ProgramForm path='/program-form/:programId' /> */}
      <Exercises path='/exercises' />
      <Workouts path='/manage/workouts' />
      <DataConsistency path='/admin/consistency-check' />
      <Test path='/admin/test' />
      <MuiPalette path='/admin/palette' />
      <Themer path='/prefs/themer' />
      <WoDay path='/woday' />
      <WoDayTracker path='/tracker/woday' />
      <Login path='/login' />
      <Meal path='/meal' />
    </Router>
  )
}

export default Routes
