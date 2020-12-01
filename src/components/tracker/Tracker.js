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
// import { retrieveItemById } from 'list-utils'
import { retrieveItemByStringId } from '../ArrayUtils'
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

  const clearProgram = () => {
    context.updateProgram({})
  }

  return get(props, 'location', null) !== null && get(props, 'location.key', null) !== routeKey ? (
    forceUpdate(props.location.key)
  ) : (
    <React.Fragment>
      {showSpinner === true ? (
        <BasicSpinner show={showSpinner} />
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
