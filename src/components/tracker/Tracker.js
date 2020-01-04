/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import ProgramsList from './ProgramsList'
import TrackerContext from '../../context/TrackerContext'
import { retrieveProgramTracker } from '../../api/trackerApi'
import ProgramTracker from './ProgramTracker'
import { basicButton, cardNoHover, row } from '../../styles/main-styles'
import { isEmpty } from 'lodash'

const Tracker = props => {
  let context = useContext(TrackerContext)
  const [showProgramList, setShowProgramList] = useState(false)

  const toggleShowProgramList = () => {
    setShowProgramList(!showProgramList)
  }

  const newWorkout = () => {
    context.clearProgram()
    toggleShowProgramList()
  }

  const handleProgramSelect = id => {
    // console.log(`handleProgramSelect => id ${id}`)
    toggleShowProgramList()
    retrieveProgramTracker(id).then(response => {
      // trackerContext.updateProgram(response.fullProgram)
      context.updateProgram(response.fullProgram)
    })
  }

  const clearProgram = () => {
    context.updateProgram({})
  }

  return (
    <React.Fragment>
      {showProgramList ? (
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
            <ProgramTracker close={clearProgram} />
          )}
        </div>
      )}
    </React.Fragment>
  )
}

export default Tracker
