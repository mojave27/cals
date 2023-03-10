import React from 'react'
import { Router } from '@reach/router'
import Home from './modules/home/Home'
import DbManage from 'modules/cals-and-macros/database/DbManage'
import Login from './Auth/Login'
// import Tracker from './tracker/Tracker'
// import ProgramForm from './programs/ProgramForm'
// import Exercises from './exercises/Exercises'
// import MealForm from 'modules/cals-and-macros/meal/MealForm'
import MealForm from 'modules/cals-and-macros/meal/MealForm'
import MealViewer from 'modules/cals-and-macros/meal/MealViewer'
import MealCalendar from 'modules/cals-and-macros/meal/MealCalendar'
import MealCalendarV2 from 'modules/cals-and-macros/meal/MealCalendarV2'
import DataConsistency from './Admin/DataConsistency'
import Test from './Admin/Test'
import MuiPalette from './Admin/MuiPalette'
import Themer from './prefs/Themer'
// import WoDay from './WoDay/WoDay'
// import Workouts from './workouts/Workouts'
// import WoDayTracker from './tracker/WoDayTracker'

const Routes = props => {
  return (
    <Router>
      <Home path='/' />
      {/* <Tracker path='/program-tracker' />
      <ProgramForm path='/program-form' />
      <Exercises path='/exercises' />
      <Workouts path='/manage/workouts' /> */}
      <DataConsistency path='/admin/consistency-check' />
      <Test path='/admin/test' />
      <MuiPalette path='/admin/palette' />
      <Themer path='/prefs/themer' />
      {/* <WoDay path='/woday' />
      <WoDayTracker path='/tracker/woday' /> */}
      <Login path='/login' />
      <MealForm {...props} path='/meal' />
      <MealCalendar path='/meals-cal' />
      <MealCalendarV2 path='/meals-cal-v2' />
      <MealViewer {...props} path='/meals' />
      <DbManage path='/manage/food-db' />
    </Router>
  )
}

export default Routes
