/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useContext, useState } from 'react'
import Modal from '../Modal'
import ProgramsList from './ProgramsList'
import TrackerContext from '../../context/TrackerContext'
import { retrieveProgramTracker } from '../../api/trackerApi'
import ProgramTracker from './ProgramTracker'
import {
  basicButton,
  cardNoHover,
  row
} from '../../styles/main-styles'
import { isEmpty } from 'lodash'

const Tracker = props => {
  let trackerContext = useContext(TrackerContext)
  const [showProgramList, setShowProgramList] = useState(false)
  const [program, setProgram] = useState({})

  const toggleShowProgramList = () => {
    setShowProgramList(!showProgramList)
  }

  const getDate = () => {
    const timestamp = Number(new Date())
    const date = new Date(timestamp).toDateString()
    return date
  }

  const newWorkout = () => {
    trackerContext.clearProgram()
    toggleShowProgramList()
  }

  const handleProgramSelect = id => {
    console.log(`handleProgramSelect => id ${id}`)
    toggleShowProgramList()
    retrieveProgramTracker(id).then(response => {
      trackerContext.updateProgram(response.fullProgram)
      setProgram(response.fullProgram)
    })
  }

  const updateProgramTracker = update => {
    console.log(`updateProgramTracker - ${JSON.stringify(update)}`)
    // update state with the changes.
  }

  return (
    <React.Fragment>
      <Modal showModal={showProgramList} handleClose={toggleShowProgramList}>
        <ProgramsList select={handleProgramSelect} />
      </Modal>
      <div css={cardNoHover}>
        { isEmpty(program) ? (
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
          <ProgramTracker program={program} update={updateProgramTracker} />
        )}
      </div>
    </React.Fragment>
  )
}

export default Tracker
