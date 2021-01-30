import React, { useContext, useState } from 'react'
import ProgramsList from './ProgramsList'
import ProgramContext from '../../context/ProgramContext'
import { retrieveProgramById } from '../../api/programsApi'
import ProgramTracker from './ProgramTracker'
import { isEmpty } from 'lodash'
import BasicSpinner from '../spinners/BasicSpinner'
import FormButton from '../inputs/FormButton'

const Tracker = props => {
  const programContext = useContext(ProgramContext)
  const [showProgramList, setShowProgramList] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)

  const toggleShowProgramList = () => {
    setShowProgramList(!showProgramList)
  }

  const chooseProgram = () => {
    programContext.clearProgram()
    toggleShowProgramList()
  }

  const handleProgramSelect = async id => {
    setShowSpinner(true)
    toggleShowProgramList()
    let program = await retrieveProgramById(id)
    await programContext.updateProgram(program)
    setShowSpinner(false)
  }

  const clearProgram = () => {
    programContext.updateProgram({})
  }

  return (
    <React.Fragment>
      {showSpinner === true ? (
        <BasicSpinner show={showSpinner} />
      ) : showProgramList ? (
        <ProgramsList select={handleProgramSelect} />
      ) : (
        <div>
          {isEmpty(programContext.program) ? (
            <div>
              <FormButton 
                value='Select Program'
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
