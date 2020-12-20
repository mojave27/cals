/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import ProgramsList from './ProgramsList'
import TrackerContext from '../../context/TrackerContext'
import { retrieveProgramById } from '../../api/programsApi'
import ProgramTracker from './ProgramTracker'
import { get } from 'lodash'
// import ThemeContext from '../../context/ThemeContext'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import { retrieveItemByStringId } from '../ArrayUtils'
import BasicSpinner from '../spinners/BasicSpinner'

const Tracker = props => {
  // const themeContext = useContext(ThemeContext)
  const context = useContext(TrackerContext)
  const [routeKey, setRouteKey] = useState(0)
  const [showProgramList, setShowProgramList] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)

  const forceUpdate = routeKey => {
    clearProgram()
    setRouteKey(routeKey)
  }

  const showTheSpinner = show => {
    setShowSpinner(show)
  }

  const toggleShowProgramList = () => {
    setShowProgramList(!showProgramList)
  }

  // const chooseProgram = () => {
  //   context.clearProgram()
  //   toggleShowProgramList()
  // }

  const handleProgramSelect = async id => {
    toggleShowProgramList()
    showTheSpinner(true)
    const allWorkouts = await retrieveWorkouts()
    let program = await retrieveProgramById(id)
    program.workouts = []
    program.workoutIds.forEach(id => {
      let workout = retrieveItemByStringId(id, allWorkouts)
      program.workouts.push(workout)
    })
    updateProgram(program)
  }

  const updateProgram = program => {
    showTheSpinner(false)
    context.updateProgram(program)
  }

  const clearProgram = async () => {
    await context.clearProgram()
    toggleShowProgramList()
  }

  return get(props, 'location', null) !== null &&
    get(props, 'location.key', null) !== routeKey ? (
    forceUpdate(props.location.key)
  ) : (
    <React.Fragment>
      {showSpinner === true ? (
        <BasicSpinner show={showSpinner} />
      ) : showProgramList ? (
        <ProgramsList select={handleProgramSelect} />
      ) : (
        <ProgramTracker
          workoutSelect={props.handleWorkoutSelect}
          close={clearProgram}
        />
      )}
    </React.Fragment>
  )
}

export default Tracker
