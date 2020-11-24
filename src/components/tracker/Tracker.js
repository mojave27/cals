/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import ProgramsList from './ProgramsList'
import TrackerContext from '../../context/TrackerContext'
import { retrieveProgramById } from '../../api/programsApi'
import ProgramTracker from './ProgramTracker'
import { styles } from '../../styles/MainStyles'
import { get, isEmpty } from 'lodash'
import ThemeContext from '../../context/ThemeContext'
import { retrieve as retrieveWorkouts } from '../../api/workoutsApi'
import { retrieveItemById } from 'list-utils'
import BasicSpinner from '../spinners/BasicSpinner'

const Tracker = props => {
  const themeContext = useContext(ThemeContext)
  const context = useContext(TrackerContext)
  const [routeKey, setRouteKey] = useState(0)
  const [showProgramList, setShowProgramList] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  let { basicButton, cardNoHover, row } = styles(themeContext.theme)

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

  const newWorkout = () => {
    context.clearProgram()
    toggleShowProgramList()
  }

  const handleProgramSelect = async id => {
    toggleShowProgramList()
    console.log('show the spinner')
    showTheSpinner(true)
    const allWorkouts = await retrieveWorkouts()
    let program = await retrieveProgramById(id)
    program.workouts = []
    program.workoutIds.forEach(id => {
      let workout = retrieveItemById(id, allWorkouts)
      program.workouts.push(workout)
    })
    // context.updateProgram(program)
    updateProgram(program)
  }

  const updateProgram = program => {
    console.log('hide the spinner')
    showTheSpinner(false)
    context.updateProgram(program)
  }

  const clearProgram = () => {
    context.updateProgram({})
  }

  // const updateLocationKey = props => {
  //   let locationKey = get(props, 'location.key', null)
  //   if (isEmpty(locationKey)) return 
  //   if (locationKey !== routeKey) {
  //     forceUpdate(props.location.key) 
  //   }
  // }

  return get(props, 'location', null) !== null && get(props, 'location.key', null) !== routeKey ? (
    forceUpdate(props.location.key)
  ) : (
  // return (
    <React.Fragment>
      {showSpinner === true ? (
        <BasicSpinner />
      ) : showProgramList ? (
        <ProgramsList select={handleProgramSelect} />
      ) : (
        <div css={cardNoHover}>
          {isEmpty(context.program) ? (
            <div css={row}>
              <input
                style={{ margin: '5px' }}
                type='button'
                value='Select Program'
                css={[basicButton, { float: 'left' }]}
                onClick={newWorkout}
              />
            </div>
          ) : (
            <ProgramTracker workoutSelect={props.handleWorkoutSelect} close={clearProgram} />
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default Tracker
