/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import ProgramsList from './ProgramsList'
import ProgramContext from '../../context/ProgramContext'
import { retrieveProgramById } from '../../api/programsApi'
import ProgramTracker from './ProgramTracker'
import { styles } from '../../styles/MainStyles'
import { get, isEmpty } from 'lodash'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import FormButton from '../inputs/FormButton'

const Tracker = props => {
  const themeContext = useContext(ThemeContext)
  const programContext = useContext(ProgramContext)
  const [routeKey, setRouteKey] = useState(0)
  const [showProgramList, setShowProgramList] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)

  let { cardNoHover, row } = styles(themeContext.theme)

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

  const chooseProgram = () => {
    programContext.clearProgram()
    toggleShowProgramList()
  }

  const handleProgramSelect = async id => {
    toggleShowProgramList()
    showTheSpinner(true)
    // const allWorkouts = await retrieveWorkouts()
    let program = await retrieveProgramById(id)
    await programContext.updateProgram(program)
    // program.workouts = []
    // program.workoutIds.forEach(id => {
    //   let workout = retrieveItemByStringId(id, allWorkouts)
    //   program.workouts.push(workout)
    // })
    // updateProgram(program)
    showTheSpinner(false)
    // setShowProgramList(false)
  }

  // const updateProgram = async program => {
  //   showTheSpinner(false)
  //   await context.updateProgram(program)
  // }

  const clearProgram = () => {
    programContext.updateProgram({})
  }

  // return (
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
          {isEmpty(programContext.program) ? (
            <div css={row}>
              <FormButton 
                buttonText='Select Program'
                onClick={chooseProgram}
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
