import React from 'react'
import { Router } from '@reach/router'
import Home from './Home/Home'
import Login from './Auth/Login'
import Tracker from './tracker/Tracker'
import Programs from './programs/Programs'
import ProgramForm from './programs/ProgramForm'
import Exercises from './exercises/Exercises'
import DataConsistency from './Admin/DataConsistency'
import Test from './Admin/Test'
import Themer from './Admin/Themer'
import WoDay from './Admin/WoDay'
import WorkoutForm from './workouts/WorkoutForm'
import Workouts from './workouts/Workouts'
import WoDayTracker from './tracker/WoDayTracker'

const Routes = () => {
  return (
    <Router>
      <Home path='/' />
      <Tracker path='/program-tracker' />
      <Programs path='/programs' />
      <ProgramForm path='/program-form' />
      <ProgramForm path='/program-form/:programId' />
      <Exercises path='/exercises' />
      <WorkoutForm path='/manage/workoutsform' />
      <Workouts path='/manage/workouts' />
      <DataConsistency path='/admin/consistency-check' />
      <Test path='/admin/test' />
      <Themer path='/admin/themer' />
      <WoDay path='/admin/test/woday' />
      <WoDayTracker path='/tracker/woday' />
      <Login path='/login' />
    </Router>
  )
}

export default Routes
