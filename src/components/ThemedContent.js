import React, { useContext, useEffect } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { navigate, Router } from '@reach/router'
import TopNav from './Nav/TopNav/TopNav'
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
import TrackerProvider from '../context/TrackerProvider'
import ProgramProvider from '../context/ProgramProvider'
import SetProvider from '../context/SetProvider'
import WoProvider from '../context/WoProvider'
import ProgramTracker from './tracker/ProgramTracker'
import WoDayProvider from '../context/WoDayProvider'
import ThemeContext from '../context/ThemeContext'
import WorkoutForm from './workouts/WorkoutForm'
import Workouts from './workouts/Workouts'
import WoDayTracker from './tracker/WoDayTracker'
import {Auth} from "aws-amplify";
// import {Logger} from "@aws-amplify/core";


const ThemedContent = () => {
  let context = useContext(ThemeContext)

  // const logger = new Logger("ThemedContent")

  useEffect(() => {
    console.log('in useEffect')
    Auth.currentAuthenticatedUser({
        // bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => {
        if (!user){
            console.log('no user')
            // history.push("/login")
            navigate("/login")
        }else{
            console.log(user)
            console.log("User is logged-in");
        }
    }).catch(err => {
            console.log('in useEffect - catch')
            console.log("Couldn't get the logged-in user for some reason: " + err);
            navigate("/login")
        }
    );
})

  return (
    <TrackerProvider>
      <ProgramProvider>
        <WoProvider>
          <SetProvider>
            <div style={{ backgroundColor: `${context.theme.color5.hex}` }}>
              <TopNav />
              <CssBaseline />
              <div
                style={{
                  backgroundColor: `${context.theme.color5.hex}`,
                  height: '300vh',
                  maxWidth: '80%',
                  margin: '20px auto'
                }}
              >
                <WoDayProvider>
                  {/* try moving <Router>..</Router> 
                          to another component, and just 
                          import that component here. */}
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
                    <ProgramTracker path='/program-viewer' />
                    <WoDayTracker path='/tracker/woday' />
                    <Login path='/login' />
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

export default ThemedContent
