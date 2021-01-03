import React, { useContext, useState } from 'react'
import ProgramsList from './ProgramsList'
import ProgramContext from '../../context/ProgramContext'
import { retrieveProgramById } from '../../api/programsApi'
import ProgramTracker from './ProgramTracker'
import { styles } from '../../styles/MainStyles'
import { isEmpty } from 'lodash'
import ThemeContext from '../../context/ThemeContext'
import BasicSpinner from '../spinners/BasicSpinner'
import FormButton from '../inputs/FormButton'

const Tracker = props => {
  const themeContext = useContext(ThemeContext)
  const programContext = useContext(ProgramContext)
  const [showProgramList, setShowProgramList] = useState(true)
  const [showSpinner, setShowSpinner] = useState(false)

  let { cardNoHover, row } = styles(themeContext.theme)

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
    let program = await retrieveProgramById(id)
    await programContext.updateProgram(program)
    showTheSpinner(false)
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
