/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useState } from 'react'
import Modal from '../Modal'
import WorkoutList from '../workouts/WorkoutList'
import WorkoutDay from './WorkoutDay'
import { retrieveWorkoutById } from '../../api/workoutsApi'
import {
  basicButton,
  cardNoHover,
  section,
  container,
  row,
  stripe
} from '../../styles/main-styles'
import { isEmpty } from 'lodash'

const WorkoutTracker = props => {
  const [showWorkoutList, setShowWorkoutList] = useState(false)
  const [selectedWorkout, setSelectedWorkout] = useState({})

  const toggleShowWorkoutList = () => {
    setShowWorkoutList(!showWorkoutList)
  }
  const getDate = () => {
    const timestamp = Number(new Date())
    const date = new Date(timestamp).toDateString()
    return date
  }

  const newWorkout = () => {}

  const existingWorkout = () => {
    toggleShowWorkoutList()
  }

  const handleSelectWorkout = event => {
    let id = event.currentTarget.id
    retrieveWorkoutById(id).then(response => {
      setSelectedWorkout(response)
      toggleShowWorkoutList()
    })
  }

  const updateWorkoutDay = update => {
    console.log(`updateWorkoutDay - ${JSON.stringify(update)}`)
    // update state with the changes.
  }

  return (
    <React.Fragment>
      <Modal showModal={showWorkoutList} handleClose={toggleShowWorkoutList}>
        <WorkoutList selectWorkout={handleSelectWorkout} />
      </Modal>
      <div css={cardNoHover}>
        { isEmpty(selectedWorkout) ? (
          <div css={row}>
            <input
              style={{ margin: '5px' }}
              type='button'
              value='New'
              css={[basicButton, { float: 'left' }]}
              onClick={newWorkout}
            />
            <input
              style={{ margin: '5px' }}
              type='button'
              value='Existing'
              css={[basicButton, { float: 'left' }]}
              onClick={existingWorkout}
            />
          </div>
        ) : (
          <WorkoutDay workout={selectedWorkout} update={updateWorkoutDay} />
        )}
      </div>
    </React.Fragment>
  )
}

export default WorkoutTracker
